import React, { useState, useCallback } from 'react' 
import { useDropzone } from 'react-dropzone'
import styles from '../styles/main.scss'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

export const ImageUploadField = () => {

  const [uploadedFiles, setUploadedFiles] = useState()

  const onDrop = useCallback((acceptedFiles) => {
    const url = `https://api.cloudinary.com/v1_1/${uploadUrl}/upload`

    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData()
      formData.append('file', acceptedFile)
      formData.append('upload_preset', uploadPreset)
      console.log(formData)
      const response = await fetch(url, {
        method: 'post',
        body: formData
      })
      const data = await response.json()
      setUploadedFiles(data.secure_url)
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accepts: 'image/*', 
    multiple: false 
  })

  console.log('URL', uploadedFiles)

  return (
    <div {...getRootProps()} className={`${styles.dropzone} ${isDragActive ? styles.active : null}`}>
      <input {...getInputProps()} />
        Add a picture
    </div>
  )
}