import { useEffect, useState } from "react";
import { Form, GetProp, message, Upload } from "antd";
import { UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";
import { useRouter } from "next/navigation";
import { useApiClient } from "@/hooks/api-hook";

// Types
type PropertyFormType = {
  propertyName: string;
  propertyDescription: string;
  propertyType: string;
  location: string;
  price: number;
  listingType: string;
  noOfBedroom: string;
  noOfBathroom: string;
  squareFootage: number;
  images: UploadFile[];
  video: File;
};

type PropertyData = {
  id: string;
  name: string;
  description: string;
  type: string;
  location: string;
  price: number;
  listingType: string;
  numberOfBedroom: string;
  numberOfBathroom: string;
  squareFootage: number;
  imagesUrls: string[];
  videoUrl: string;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// Constants
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

// Helper functions
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const usePropertyForm = (propertyData?: PropertyData) => {
  const router = useRouter();
  const { post, put, inProgress } = useApiClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<PropertyFormType>();
  const { setFieldValue, resetFields } = form;

  // State variables
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);

  const isEditMode = !!propertyData;

  const FORM_OPTIONS = {
    propertyTypes: [
      { label: "Residential", value: "Residential" },
      { label: "Commercial", value: "Commercial" },
      { label: "Industrial", value: "Industrial" },
      { label: "Agricultural", value: "Agricultural" },
    ],
    bedrooms: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
    ],
    bathrooms: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
    ],
    tenancyTypes: [
      { label: "Rent", value: "Rent" },
      { label: "Lease", value: "Lease" },
      { label: "Sale", value: "Sale" },
    ],
  };

  const VALIDATION_RULES = {
    required: (message: string) => ({
      required: true,
      message,
    }),
    number: {
      type: "number" as const,
      message: "Must be a number",
    },
    nonNegative: {
      validator: (_: any, value: number) => {
        if (value >= 0) return Promise.resolve();
        return Promise.reject(new Error("Cannot be negative"));
      },
    },
    positiveNumber: {
      validator: (_: any, value: number) => {
        if (value > 0) return Promise.resolve();
        return Promise.reject(new Error("Must be greater than 0"));
      },
    },
    usPhoneNumber: {
      pattern:
        /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/,
      message: "Please enter a valid US or Canadian phone number",
    },
  };

  useEffect(() => {
    if (propertyData) {
      // Convert backend data format to form format
      const formValues: Partial<PropertyFormType> = {
        propertyName: propertyData.name,
        propertyDescription: propertyData.description,
        propertyType: propertyData.type,
        location: propertyData.location,
        price: propertyData.price,
        listingType: propertyData.listingType,
        noOfBedroom: propertyData.numberOfBedroom,
        noOfBathroom: propertyData.numberOfBathroom,
        squareFootage: propertyData.squareFootage,
      };

      // Set form values
      form.setFieldsValue(formValues);

      // Handle existing images
      if (propertyData.imagesUrls && propertyData.imagesUrls.length > 0) {
        // Convert image URLs to UploadFile objects for Ant Design
        const uploadFiles = propertyData.imagesUrls.map((url, index) => ({
          uid: `-${index}`,
          name: `image-${index}.jpg`,
          status: "done" as const,
          url,
        }));

        setFileList(uploadFiles);
        setFieldValue("images", uploadFiles);
        setImageUrls(propertyData.imagesUrls);
      }

      // Handle existing video
      if (propertyData.videoUrl) {
        const videoFile = {
          uid: "existing-video",
          name: "existing-video.mp4",
          status: "done" as const,
          url: propertyData.videoUrl,
        };

        setVideoUrl(propertyData.videoUrl);
        setFieldValue("video", videoFile);
      }
    }
  }, [propertyData, form, setFieldValue]);

  // Form submission handler
  const handleSubmit = async (values: PropertyFormType) => {
    try {
      const formData = new FormData();

      // Add text fields
      formData.append("Name", values.propertyName);
      formData.append("Description", values.propertyDescription);
      formData.append("Type", values.propertyType);
      formData.append("Location", values.location);
      formData.append("Price", values.price.toString());
      formData.append("NumberOfBedroom", values.noOfBedroom);
      formData.append("NumberOfBathroom", values.noOfBathroom);
      formData.append("SquareFootage", values.squareFootage.toString());
      formData.append("ListingType", values.listingType);
      const imageFiles = values.images.map((image) => image.originFileObj);

      imageFiles.forEach((file) => {
        if (file) {
          formData.append("Images", file);
        }
      });
      formData.append("Video", values.video);

      // Add property ID if in edit mode
      if (isEditMode && propertyData?.id) {
        formData.append("id", propertyData.id);
      }

      // Call the appropriate API endpoint
      let response;
      if (isEditMode) {
        response = await put(
          `/api/RealEstate/properties/${propertyData?.id}`,
          formData
        );
      } else {
        response = await post(`/api/RealEstate/properties`, formData);
      }

      if (response) {
        messageApi.success(
          `Property ${isEditMode ? "updated" : "added"} successfully`
        );

        // Reset form if adding new property
        if (!isEditMode) {
          resetFields();
          setImageUrls([]);
          setVideoUrl(undefined);
          setFileList([]);
        }

        // Navigate back to properties list after a short delay
        router.push("/dashboard/real-estate/properties");
      }
    } catch (error) {
      console.error("Error submitting property:", error);
      messageApi.error(`Failed to ${isEditMode ? "update" : "add"} property`);
    }
  };

  // File upload handlers
  const handleImageChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList(info.fileList);
    setFieldValue("images", info.fileList);

    const newFile = info.file;
    if (newFile.status === "done" && newFile.originFileObj) {
      getBase64(newFile.originFileObj as FileType, (url) => {
        // Avoid duplicate entries by checking if URL already exists
        if (!imageUrls.includes(url)) {
          setImageUrls((prevUrls) => [...prevUrls, url]);
        }
      });
    }
  };

  const handleImageBeforeUpload = (file: File) => {
    // Check file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      messageApi.error(
        `File type ${file.type} is not supported. Please upload an image (JPEG, PNG, GIF, or WEBP)`
      );
      return Upload.LIST_IGNORE;
    }

    // Check file size
    if (file.size > MAX_IMAGE_SIZE) {
      messageApi.error(
        `File size exceeds 5MB limit. Current file size: ${(
          file.size /
          1024 /
          1024
        ).toFixed(2)}MB`
      );
      return Upload.LIST_IGNORE;
    }
  };

  const handleImageRemove = (file: UploadFile<any>) => {
    // Find the URL associated with this file and remove it
    if (file.url) {
      setImageUrls((prevUrls) => prevUrls.filter((url) => url !== file.url));
    } else if (file.thumbUrl) {
      setImageUrls((prevUrls) =>
        prevUrls.filter((url) => url !== file.thumbUrl)
      );
    } else if (file.originFileObj) {
      const fileIndex = fileList.findIndex((f) => f.uid === file.uid);
      if (fileIndex >= 0 && imageUrls.length > fileIndex) {
        setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== fileIndex));
      }
    }

    // Update fileList
    const filteredList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(filteredList);
    setFieldValue("images", filteredList);

    return true;
  };

  const handleVideoChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setVideoUrl(undefined);
    setFieldValue("video", undefined);
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setVideoUrl(url);
        setFieldValue("video", info.file.originFileObj);
      });
    }
  };

  const handleVideoBeforeUpload = (file: File) => {
    // Check file type
    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
      messageApi.error(
        `File type ${file.type} is not supported. Please upload a video (MP4, WEBM, or OGG)`
      );
      return Upload.LIST_IGNORE;
    }

    // Check file size
    if (file.size > MAX_VIDEO_SIZE) {
      messageApi.error(
        `File size exceeds 100MB limit. Current file size: ${(
          file.size /
          1024 /
          1024
        ).toFixed(2)}MB`
      );
      return Upload.LIST_IGNORE;
    }
  };

  const handleVideoRemove = () => {
    setVideoUrl(undefined);
    setFieldValue("video", undefined);
  };

  return {
    form,
    isEditMode,
    inProgress,
    contextHolder,
    imageUrls,
    fileList,
    videoUrl,
    FORM_OPTIONS,
    VALIDATION_RULES,
    handleSubmit,
    handleImageChange,
    handleImageBeforeUpload,
    handleImageRemove,
    handleVideoChange,
    handleVideoBeforeUpload,
    handleVideoRemove,
  };
};

export type { PropertyFormType, PropertyData };

