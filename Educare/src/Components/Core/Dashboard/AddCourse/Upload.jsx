import React, { useEffect, useRef, useState } from "react"
import { FiUploadCloud } from "react-icons/fi"

const imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"]
const imageExtensions = [".png", ".jpeg", ".jpg", ".webp"]
const videoTypes = [
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-matroska",
  "video/webm",
]
const videoExtensions = [".mp4", ".mov", ".avi", ".mkv", ".webm"]

export default function Upload({
  name,
  label,
  register,
  setValue,
  clearErrors,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [previewSource, setPreviewSource] = useState("")
  const fileInputRef = useRef(null)
  const previewUrlRef = useRef(null)

  const acceptedTypes = video ? videoTypes : imageTypes
  const acceptedExtensions = video ? videoExtensions : imageExtensions
  const acceptedFormats = video
    ? videoExtensions.join(",")
    : imageExtensions.join(",")
  const helperText = video
    ? "Upload MP4, MOV, AVI, MKV, or WEBM"
    : "Upload PNG, JPG, JPEG, or WEBP"
  const isReadOnly = Boolean(viewData) && !editData
  const displayedPreview = previewSource || viewData || editData || ""

  useEffect(() => {
    register(name, {
      required: !viewData && !editData ? `${label} is required` : false,
    })
  }, [editData, label, name, register, viewData])

  const handleClick = () => {
    if (!isReadOnly) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase() || ""}`
    const isValidType =
      acceptedTypes.includes(file.type) || acceptedExtensions.includes(fileExtension)

    if (!isValidType) {
      event.target.value = ""
      return
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
    }

    const previewUrl = URL.createObjectURL(file)
    previewUrlRef.current = previewUrl
    setPreviewSource(previewUrl)
    setValue(name, file, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
    clearErrors?.(name)
  }

  useEffect(() => {
    if (viewData || editData) {
      const existingFile = viewData || editData
      setValue(name, existingFile, {
        shouldValidate: true,
        shouldDirty: false,
        shouldTouch: false,
      })
      clearErrors?.(name)
    }
  }, [clearErrors, editData, name, setValue, viewData])

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
      }
    }
  }, [])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!isReadOnly && <sup className="text-pink-200">*</sup>}
      </label>

      <div className="flex min-h-[250px] flex-col items-center justify-center rounded-md border border-dashed border-richblack-500 bg-richblack-700 p-6">
        {displayedPreview ? (
          <div className="w-full space-y-4">
            {video ? (
              <video
                controls
                className="h-full max-h-[300px] w-full rounded-md object-cover"
                src={displayedPreview}
              />
            ) : (
              <img
                src={displayedPreview}
                alt={label}
                className="h-full max-h-[300px] w-full rounded-md object-cover"
              />
            )}

            {!isReadOnly && (
              <button
                type="button"
                onClick={handleClick}
                className="mx-auto block rounded-md bg-yellow-50 px-4 py-2 font-semibold text-richblack-900"
              >
                Change {video ? "Video" : "Image"}
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-richblack-800 text-yellow-50">
              <FiUploadCloud className="text-2xl" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-richblack-200">
                Drag and drop is not enabled here, so choose a file to continue.
              </p>
              <p className="text-xs text-richblack-300">{helperText}</p>
            </div>
            <button
              type="button"
              onClick={handleClick}
              className="rounded-md bg-yellow-50 px-4 py-2 font-semibold text-richblack-900"
            >
              Select {video ? "Video" : "Image"}
            </button>
          </div>
        )}

        <input
          id={name}
          type="file"
          accept={acceptedFormats}
          className="hidden"
          disabled={isReadOnly}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {errors[name].message || `${label} is required`}
        </span>
      )}
    </div>
  )
}
