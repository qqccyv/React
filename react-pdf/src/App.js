import React, { Component } from 'react'
const pdfJS = require('pdfjs-dist');
pdfJS.GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/build/pdf.worker.min.js";

export default class App extends Component {
  state = {
    isLoading: false,
    pdfUrl: "/api/2021-05-21/%E5%BA%94%E7%94%A8%E5%B8%82%E5%9C%BA%E4%B8%8A%E6%9E%B6%20APP%20%E8%AF%B4%E6%98%8E.pdf",
    pdfDoc: null, // pdfjs 生成的对象
    pageNum: 0, // 当前页数
    pageRendering: false,
    pageNumPending: null,
    scale: 1, // 放大倍数
    page_num: 0, // 当前页数
    pageCount: 0, // 总页数
    maxscale: 5, // 最大放大倍数
    minscale: 0.3, // 最小放大倍数
    waterInfo: {}
  }
  myCanvas = React.createRef()
  componentDidMount() {
    const { pdfUrl } = this.state;
    this.init(pdfUrl)
  }
  // 初始化pdf
  init = (pdfUrl) => {
    pdfJS.getDocument(pdfUrl).promise.then((pdfDoc_) => {
      this.setState({
        pdfDoc: pdfDoc_,
        pageCount: pdfDoc_.numPages,
        pageNum: 1,
      }, () => {
        this.renderPage(1);
      })

    });
  }
  // 渲染pdf
  renderPage = (num) => {
    const { pdfDoc, scale } = this.state
    let canvas = this.myCanvas.current;
    // Using promise to fetch the page
    pdfDoc.getPage(num).then((page) => {
      var viewport = page.getViewport(scale);
      // canvas.height = viewport.height;
      // canvas.width = viewport.width;
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth * 0.9;
      let ctx = canvas.getContext("2d")
      var renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };
      page.render(renderContext);
      // renderTask.promise.then(() => {

      //   ctx.fillRect(0, 0, canvas.width, canvas.height);
      //   if (this.state.pageNumPending !== null) {
      //     this.renderPage(this.state.pageNumPending);
      //     this.setState({
      //       pageNumPending: null
      //     })
      //   }
      // });
    });
  }
  render() {
    return (
      <div>
        <canvas ref={this.myCanvas}></canvas>
      </div>
    )
  }
}
