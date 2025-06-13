
import { useState } from "react";
import { Upload, X, File, Image as ImageIcon, Video, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MediaFile {
  id: string;
  file: File;
  type: 'image' | 'video' | 'pdf';
  url: string;
  name: string;
  size: number;
}

interface MediaUploadProps {
  label: string;
  accept: string;
  onFilesSelect: (files: MediaFile[]) => void;
  existingFiles?: MediaFile[];
  multiple?: boolean;
  maxFiles?: number;
}

const MediaUpload = ({ 
  label, 
  accept, 
  onFilesSelect, 
  existingFiles = [], 
  multiple = true,
  maxFiles = 10 
}: MediaUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<MediaFile[]>(existingFiles);

  const getFileType = (file: File): 'image' | 'video' | 'pdf' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type === 'application/pdf') return 'pdf';
    return 'pdf'; // default
  };

  const getFileIcon = (type: 'image' | 'video' | 'pdf') => {
    switch (type) {
      case 'image': return <ImageIcon className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'pdf': return <FileText className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const handleFileSelect = (files: FileList) => {
    const newFiles: MediaFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (selectedFiles.length + newFiles.length >= maxFiles) break;
      
      const mediaFile: MediaFile = {
        id: Date.now().toString() + i,
        file,
        type: getFileType(file),
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size
      };
      
      newFiles.push(mediaFile);
    }
    
    const updatedFiles = multiple ? [...selectedFiles, ...newFiles] : newFiles;
    setSelectedFiles(updatedFiles);
    onFilesSelect(updatedFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    const updatedFiles = selectedFiles.filter(file => file.id !== id);
    setSelectedFiles(updatedFiles);
    onFilesSelect(updatedFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
          dragActive
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-3">
          <div className="flex justify-center">
            <div className="p-4 bg-gray-100 rounded-full">
              <Upload className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div>
            <p className="text-gray-600">
              Drag and drop your files here, or{' '}
              <span className="text-indigo-600 font-medium">browse</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {accept.includes('image') && 'Images: PNG, JPG, GIF '}
              {accept.includes('video') && 'Videos: MP4, AVI, MOV '}
              {accept.includes('pdf') && 'Documents: PDF '}
              up to 10MB each
            </p>
            {multiple && (
              <p className="text-xs text-gray-400 mt-1">
                Maximum {maxFiles} files • {selectedFiles.length} selected
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Selected Files Display */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Selected Files ({selectedFiles.length})</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedFiles.map((file) => (
              <div key={file.id} className="relative group">
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                  {/* File Preview */}
                  <div className="aspect-video bg-gray-50 flex items-center justify-center">
                    {file.type === 'image' ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : file.type === 'video' ? (
                      <div className="flex flex-col items-center space-y-2">
                        <Video className="h-8 w-8 text-blue-500" />
                        <video
                          src={file.url}
                          className="w-full h-20 object-cover rounded"
                          controls={false}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center space-y-2">
                        <FileText className="h-8 w-8 text-red-500" />
                        <span className="text-xs text-gray-500">PDF Document</span>
                      </div>
                    )}
                  </div>
                  
                  {/* File Info */}
                  <div className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {getFileIcon(file.type)}
                            <span className="ml-1">{file.type.toUpperCase()}</span>
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 h-8 w-8 p-0 ml-2"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
