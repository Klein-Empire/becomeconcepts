
import { useState } from "react";
import { Upload, X, File, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  label: string;
  accept: string;
  onFileSelect: (file: File | null) => void;
  preview?: string;
  type?: 'image' | 'pdf' | 'any';
}

const FileUpload = ({ label, accept, onFileSelect, preview, type = 'any' }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Simulate file upload and return a URL
    const mockUrl = URL.createObjectURL(file);
    onFileSelect(file);
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      
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
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {selectedFile || preview ? (
          <div className="space-y-3">
            {type === 'image' && (selectedFile || preview) && (
              <div className="relative inline-block">
                <img
                  src={selectedFile ? URL.createObjectURL(selectedFile) : preview}
                  alt="Preview"
                  className="max-w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <Button
                  type="button"
                  onClick={clearFile}
                  size="sm"
                  variant="outline"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            {type === 'pdf' && selectedFile && (
              <div className="flex items-center justify-center space-x-2 p-4 bg-gray-50 rounded-lg">
                <File className="h-8 w-8 text-red-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button
                  type="button"
                  onClick={clearFile}
                  size="sm"
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {type === 'image' ? (
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto" />
            ) : (
              <Upload className="h-12 w-12 text-gray-400 mx-auto" />
            )}
            <div>
              <p className="text-gray-600">
                Drag and drop your file here, or{' '}
                <span className="text-indigo-600 font-medium">browse</span>
              </p>
              <p className="text-sm text-gray-500">
                {accept.includes('image') && 'PNG, JPG, GIF up to 10MB'}
                {accept.includes('pdf') && 'PDF files up to 10MB'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
