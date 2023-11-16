import {v4 as uuidv4} from "uuid"
import {objHasOwnProperty} from "@/Helpers/BaseHelper"

export const scene = {
  data: () => ({
    svgViewBoxX: 0,
    svgViewBoxY: 0,
    svgViewBoxWidth: 1920,
    svgViewBoxHeight: 1080,
    svgZoomPosition: null,
    svgZoom: 2
  }),
  computed: {
    svgViewBoxScene () {
      if (this.svgZoomPosition === null) {
        return `${this.svgViewBoxX} ${this.svgViewBoxY} ${this.svgViewBoxWidth} ${this.svgViewBoxHeight}`
      }
      let width = this.svgViewBoxWidth / this.svgZoom
      let height = this.svgViewBoxHeight / this.svgZoom
      let x = this.svgZoomPosition.x
      let y = this.svgZoomPosition.y
      if (x > width / 2) {
        x = Math.min(x + width / 2, this.svgViewBoxWidth) - width
      } else {
        x = Math.max(x - width / 2, this.svgViewBoxX)
      }
      if (y > height / 2) {
        y = Math.min(y + height / 2, this.svgViewBoxHeight) - height
      } else {
        y = Math.max(y - height / 2, this.svgViewBoxY)
      }
      return `${x} ${y} ${width} ${height}`
    }
  },
  methods: {
    svgClickHandler: function (event) {
      // let ff = this.$refs.light
      let ocfId = null
      let ocfType = null
      let index
      let elem = null
      elem = event.target || event.srcElement
      for (index = 0; index < 2; ++index) {
        if (elem instanceof Element) {
          ocfType = elem.getAttribute('ocf')
          if (ocfType) {
            ocfId = elem.id
            break
          } else {
            elem = elem.parentElement
          }
        }
      }
      console.log(`q type=${ocfType}, id=${ocfId}`)
      let value
      let uri
      let uid= uuidv4()
      switch (ocfType) {
        case 'oic.r.switch.binary':
        case 'resource':
          value = !(elem.getAttribute('value') === '1')
          uri = elem.getAttribute('uri')
          this.$socket.sendObj({
            uid,
            type: 'call',
            name: 'AdminPanel/OcfResource/request',
            data: ['update', uri, { value }]
          })
          // if (value) {
          //   elem.setAttribute('value', '1')
          //   this.$refs[uri].firstChild.style.fill = 'yellow'
          // } else {
          //   elem.setAttribute('value', '0')
          //   this.$refs[uri].firstChild.style.fill = 'white'
          // }
          break
        case 'scene':
          if (this.svgZoomPosition) {
            this.svgZoomPosition = null
          } else {
            this.svgZoomPosition = {
              x: Number(elem.getAttribute('x')) + Number(elem.getAttribute('width')) / 2,
              y: Number(elem.getAttribute('y')) + Number(elem.getAttribute('height')) / 2
            }
            console.log(`${this.svgZoomPosition.x} ${this.svgZoomPosition.y}`)
          }
          break
      }
    },
    onConnect: function () {
      console.log(`connect. refs: ${Object.keys(this.$refs).length}`)
      for (let ref in this.$refs) {
        if (objHasOwnProperty(this.$refs,ref)) {
          let item = this.$refs[ref]
          let ocf = item.getAttribute('ocf')
          let uri = item.getAttribute('uri')
          let uid= uuidv4()
          if (ocf && uri) {
            this.$socket.sendObj({
              uid,
              type: 'call',
              name: 'AdminPanel/OcfResource/observe',
              data: [uri]
            })
          }
        }
      }
    },
    initWebSocket: function () {
      this.$socket.onopen = () => {
        this.onConnect()
      }
      this.$socket.reconnect = () => {
        this.onConnect()
      }
      this.$socket.onmessage = (data) => {
        data = JSON.parse(data.data)
        let uri = `ocf://${data.to.di}${data.to.href}`
        if (objHasOwnProperty(this.$refs, uri)) {
          let elem = this.$refs[uri]
          let ocf = elem.getAttribute('ocf')
          switch (ocf) {
            case 'oic.r.switch.binary':
              if (data.cn.value) {
                elem.setAttribute('value', '1')
                this.$refs[uri].firstChild.style.fill = 'yellow'
              } else {
                elem.setAttribute('value', '0')
                this.$refs[uri].firstChild.style.fill = 'white'
              }
              break
          }
        }
      }
    }
  },
  mounted () {
    this.initWebSocket()
    if (this.$socket.readyState) {
      this.onConnect()
    }
  }
}
