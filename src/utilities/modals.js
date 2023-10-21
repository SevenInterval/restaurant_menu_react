import { Modal } from 'antd';

export const successModal = (message) => {
    Modal.success({
        content: message + ' İşlemi Başarılı Gerçekleşti'
    })
}

export const errorModal = (message) => {
    Modal.error({
        content: message
    })
}