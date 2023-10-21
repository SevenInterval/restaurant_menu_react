import { useEffect, useRef, useState } from "react";
import { backendUri } from "../../utilities/strings";
import { Divider, Image, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
}

const UploadImage = (props) => {
  const [uploadFile, setUploadFile] = useState([]);
  const [previewImage, setPreviewImage] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [belgeGorsel, setBelgeGorsel] = useState();
  const [imageId, setImageId] = useState();
  const url = backendUri;
  const isFetchImage = useRef(false);

  useEffect(() => {
    if (!isFetchImage.current) {
      const id = "653391c526cc96881ed3856a";
      findImageById(id);
      isFetchImage.current = true;
    }

  }, [])

  const handleUpload = (uploadFile) => {
    if (uploadFile.fileList && uploadFile.fileList.length > 1) {
      uploadFile.fileList.splice(0, 1);
    }
    setUploadFile([...uploadFile.fileList]);
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.preview);
    setPreviewVisible(true);
  }

  const handleCancle = () => { setPreviewVisible(false) }

  const uploadImage = async () => {
    if (uploadFile && uploadFile.length > 0) {
      const base64Object = {
        base64: await getBase64(uploadFile[0].originFileObj)
      }
      let res = await fetch(url + "/image", {
        method: "POST",
        body: JSON.stringify(base64Object),
        crossDomain: true,
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Image id: ", data.image._id);
          setImageId(data.image._id);
        })
        .catch(error => {
          res.json(error);
          res.status(405).end();
        })
    }
  }

  const findImageById = async (id) => {
    let res = await fetch(url + '/image/byid', {
      method: 'POST',
      body: JSON.stringify({ _id: id }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // eslint-disable-next-line no-unused-expressions
        setBelgeGorsel(data.image.image);
      })
      .catch(error => {
        res.json(error);
        res.status(405).end();
      })
  }

  return (
    <>
      Let's Upload Image <br />
      {/* <input
        accept="image/*"
        type="file"
        onChange={convertToBase64} />
      {(image === "" || image === null) ?
        // eslint-disable-next-line jsx-a11y/alt-text
        "" : <img width={100} height={100} src={image} />
      } */}
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={handleCancle}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      <Upload listType="picture-card"
        multiple={false}
        accept="image/*"
        fileList={uploadFile}
        onPreview={handlePreview}
        onChange={handleUpload}
        beforeUpload={() => false}>
        <div>
          <UploadOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>


      </Upload>
      <Divider />
      {belgeGorsel &&
        <>
          <Image src={belgeGorsel} width={200} />
          <img src={belgeGorsel} width={200} />
        </>}
      <Divider />

      <button onClick={() => uploadImage()}>Upload</button>
    </>
  )
}

export default UploadImage;