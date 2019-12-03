<template>
    <div class="pdfViewer" id="pdfViewer"></div>
</template>

<script>
import pdfJS from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker';
import { TextLayerBuilder } from 'pdfjs-dist/web/pdf_viewer';
import 'pdfjs-dist/web/pdf_viewer.css';

export default {
    props: ['path'],
    data: function(){
        return {};
    },
    mounted() {
        this.getPDFContainerHtml();
    },
    methods: {
        getPDFContainerHtml: function(){
            let container = document.getElementById('pdfViewer');
            pdfJS.getDocument(this.path).then((pdf) => {
                for (let i = 1; i <= pdf.numPages; i++) {
                   pdf.getPage(i).then((page) => {
                        let viewport = page.getViewport({scale: 1});
                        let pageDiv = document.createElement('div');
                        pageDiv.setAttribute('id', 'page-' + (page.pageIndex + 1));
                        container.appendChild(pageDiv);
                        let canvas = document.createElement('canvas');
                        pageDiv.appendChild(canvas);
                        let context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        
                        let renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        
                        page.render(renderContext).then(function () {
                            return page.getTextContent();
                        }).then((textContent) => {
                            // 创建文本图层div
                            const textLayerDiv = document.createElement('div');
                            textLayerDiv.setAttribute('class', 'textLayer');
                            // 将文本图层div添加至每页pdf的div中
                            document.getElementById(`page-${i}`).append(textLayerDiv);
                                            
                            // 创建新的TextLayerBuilder实例
                            let textLayer = new TextLayerBuilder({
                                textLayerDiv: textLayerDiv,
                                pageIndex: page.pageIndex,
                                viewport: viewport
                            });
                                            
                            textLayer.setTextContent(textContent);
                            textLayer.render();
                        });
                    }, (err) => {
                        console.log(err, '-------err---------');
                    });
                }
            }, (reason) => {
                console.error(reason);
            });
            
        }
    }
}
</script>

<style lang="less">
.pdfViewer {
    display: flex;
    flex-direction: column;
    > div {
        position: relative;
        margin: 0 auto;
    }
}
</style>

