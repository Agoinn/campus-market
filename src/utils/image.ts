//把图片缩小并转成JPEG,减少存进 localStorage 的体积
export function compressImage(dataUrl: string,maxSide = 800,quality = 0.7):Promise<string>{
    return new Promise((resolve,reject) => {
        const img = new Image()
        img.onload = () =>{
            //长边最多 800px,等比缩小
            const scale = Math.min(1,maxSide / Math.max(img.width,img.height))
            const canvs = document.createElement('canvas')
            canvs.width = Math.round(img.width * scale)
            canvs.height = Math.round(img.height * scale)

            const ctx = canvs.getContext('2d')
            if(!ctx) return reject(new Error('画布创建失败'))
            ctx.drawImage(img,0,0,canvs.width,canvs.height)

            resolve(canvs.toDataURL('image/jpeg',quality))
        }
        img.onerror = () => reject(new Error('图片读取失败'))
        img.src = dataUrl
    })
}