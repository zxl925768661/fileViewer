<template>
    <div>
        <a href="javascript:;" :title="file.name" @click="showViewer">{{file.name}}</a>
        <div class="com-fileViewer" v-show="showFileViewer">
            <div class="com-fileViewer-header" v-show="showControl">
                <div class="com-fileViewer-header">
                    <div class="com-fileViewer-control control-btn-download" @click="downloadFile">
                        <span>download</span>
                    </div>
                    <div class="com-fileViewer-control control-btn-close" @click="closeFileViewer">
                        <span>close</span>
                    </div>
                </div>
            </div>
            <div class="com-fileViewer-content" ref="viewContent">
                <img v-if="isImg(file.type)" class="com-fileViewer-item" :src="file.path">
                <embed v-else-if="isOffice(file.type)" :src="'https://view.officeapps.live.com/op/embed.aspx?src=' + file.path" href="http://office.com" width="100%" height="100%"/>
                <video v-else-if="isViedo(file.type)" controls="controls" :src="file.path">your browser does not support the video tag</video>
                <audio v-else-if="isAudio(file.type)" controls="controls" :src="file.path">your browser does not support the audio tag</audio>
                <template v-else-if="file.type == 'pdf' && showFileViewer"><pdfViewer ref="pdfViewer" :path="file.path"></pdfViewer></template>
            </div>
            <div class="com-fileViewer-footer"></div>
        </div>
    </div>
</template>

<script>
const IMAGEEXTENSTIONS = [
    "gif",
    "jpeg",
    "jpg",
    "png",
    "webp"
]
const MICROSOFTOFFICEEXTENSIONS = [
    "doc",
    "docx",
    "dotx",
    "dotm",
    "docm",
    "xls",
    "xlt",
    "xlsx",
    "xlsm",
    "xltx",
    "xltm",
    "xlsb",
    "xlam",
    "ppt",
    "pptx",
    "pptm",
    "potx",
    "potm",
    "ppam",
    "ppsx",
    "ppsm"
]
const VIDEOEXTENSTIONS = [
    "ogg",
    "mpeg4",
    "webm"
];
const AUDIOEXTENSTIONS = [
    "mp3",
    "wav"
];
export default {
    name: 'fileViewer',
    props: {
        file: {
            type: Object,
            default: () => ({})
        },
        showControl: {
            type: Boolean,
            default: () => true
        }
    },
    data: function() {
        return {
            showFileViewer: false
        }
    },
    components: {
        pdfViewer: resolve => require.ensure([], () => resolve(require('./PDFViewer')), 'pdfViewer')
    },
    created: function() {},
    mounted: function() {},
    methods: {
        showViewer: function() {
            this.showFileViewer = true;
        },
        downloadFile: function() {
            let { path, fileName, fileType } = this.file;
            const fileTag = document.createElement("a");
            fileTag.href = path;
            fileTag.setAttribute("download", `${fileName}.${fileType}`);
            fileTag.click();
            fileTag.remove();
        },
        closeFileViewer: function() {
            this.showFileViewer = false;
            this.$refs.pdfViewer.innerHTML = '';
        },
        isImg: function(type) {
            return IMAGEEXTENSTIONS.includes(type);
        },
        isOffice: function(type) {
            return MICROSOFTOFFICEEXTENSIONS.includes(type);
        },
        isViedo: function(type) {
            return VIDEOEXTENSTIONS.includes(type);
        },
        isAudio: function(type) {
            return AUDIOEXTENSTIONS.includes(type);
        }
    }
}
</script>

<style lang="less">
    @import url('./style.less');
</style>


