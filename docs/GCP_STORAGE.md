# GCP Bucket Image Storage Implementation

This document outlines how image storage is implemented using Google Cloud Platform (GCP) Storage Buckets in the Amphi-Bien application.

## Overview

The application uses two GCP storage buckets:
- **Source Bucket**: Stores original, uncropped images uploaded by users
- **Cropped Bucket**: Stores cropped versions of images processed by a cloud function

## Environment Variables

The following environment variables must be set:

```bash
# GCP Storage configuration
GCP_SOURCE_BUCKET=amphi-bien-images-uncropped
GCP_CROPPED_BUCKET=amphi-bien-images-cropped
```

These are defined in `.env.defaults` but should be overridden in your `.env` file with the actual bucket names for your environment.

## Authentication

This implementation assumes that GCP authentication has been set up properly:
- For local development, you'll need the Google Cloud CLI installed and authenticated
- For production, use service account credentials appropriate for your deployment environment

## Image Upload Flow

1. **Frontend requests a signed URL**: The client calls `generateSignedUrl` mutation with an amphi ID
2. **Backend generates a signed URL**: The server creates a unique filename (`amphi-{id}-{uuid}`) and generates a signed URL for uploading
3. **Frontend uploads to the URL**: The client uploads the image directly to GCP Storage using the signed URL
4. **Frontend registers the uploaded image**: After upload, the client calls `registerUploadedImage` mutation to create a database record
5. **Cloud Function processes the image**: An existing cloud function (not part of this codebase) detects the new image, crops it, and puts it in the cropped bucket
6. **Frontend displays cropped image**: The application displays the cropped version of the image from the cropped bucket

## Backend Implementation

The backend implementation consists of:

1. **Storage Service** (`api/src/lib/storage.ts`): Helper functions for interacting with GCP Storage
2. **GraphQL Schema** (`api/src/graphql/images.sdl.ts`): Defines new mutations for signed URLs
3. **Images Service** (`api/src/services/images/images.ts`): Implements the new mutations

## Frontend Implementation

The frontend implementation includes:

1. **ImageUploader Component** (`web/src/components/ImageUploader/ImageUploader.tsx`): Reusable component for uploading images via signed URLs
2. **AmphiForm Integration** (`web/src/components/Amphi/AmphiForm/AmphiForm.tsx`): Uses the ImageUploader for amphi images
3. **ImageForm Integration** (`web/src/components/Image/ImageForm/ImageForm.tsx`): Uses the ImageUploader for single image uploads

## Image Limits

The system enforces a maximum of 10 images per amphi:
- The backend checks the current count before generating signed URLs
- The frontend disables the upload component when the limit is reached

## Deleting Images

When an image is deleted:
1. The record is removed from the database
2. The file is deleted from both the source and cropped buckets

## Cloud Function Configuration

The existing cloud function should:
1. Watch the source bucket for new objects
2. Process (crop) the images when they arrive
3. Store the cropped images in the cropped bucket with the same filename

Ensure your cloud function is properly configured to handle the image processing requirements.

## Future Improvements

Potential improvements to consider:
- Add image type validation on the backend
- Implement temporary image caching for better performance
- Add image compression to reduce storage usage
- Support image rotation based on EXIF data
