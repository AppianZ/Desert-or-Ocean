<template>
    <div class="pic-upload">
        <span class="pic-button">点击上传图片</span>
        <input type="file" value="上传文件" class="pic-input" ref="ipt"/>
        <p class="pic-img-area" v-if="result.trim() !== ''">
            <img :src="result">
        </p>
    </div>
</template>

<style>
    .pic-upload {
        position: relative;
    }
    .pic-button {
        display: inline-block;
        height: 40px;
        width: 180px;
        line-height: 40px;
        text-align: center;
        color: #F87A91;
        border-radius: 5px;
        border: 1px solid #F87A91;
    }
    .pic-input {
        position: absolute;
        left: 0;
        top: 0;
        height: 40px;
        width: 180px;
        background: red;
        opacity: 0;
        z-index: 100;
        cursor: pointer;
    }
    .pic-img-area {
        margin: 20px 0 0 0;
        max-width: 250px;
        box-shadow: 0 0 40px rgba(0, 0, 0, .1);
    }
</style>

<script>
    export default{
        data() {
            return {
                cantReadFile: false,
                result: '',
            };
        },
        mounted() {
            if (typeof (FileReader) === 'undefined') {
                this.cantReadFile = true;
                alert('抱歉，你的浏览器不支持 FileReader，请使用其他浏览器！');
            } else {
                this.$refs.ipt.addEventListener('change', this.readFile, false);
            }
        },
        methods: {
            readFile() {
                if(this.cantReadFile){
                    alert('抱歉，你的浏览器不支持 FileReader，请使用其他浏览器！');
                    return;
                }
                const file = this.$refs.ipt.files[0];
                if (!/image\/\w+/.test(file.type)) {
                    alert('请确保文件为图像类型');
                    return;
                }
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    this.result = reader.result;
                    this.$emit('on-success', reader.result);
                };
            },
        },
    };
</script>
