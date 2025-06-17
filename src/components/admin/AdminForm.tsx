
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MediaUpload from "@/components/MediaUpload";
import type { MediaFile } from "@/components/MediaUpload";

interface AdminFormProps {
  section: string;
  formState: any;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onFileSelect: (files: MediaFile[]) => void;
  onSubmit: () => void;
  setFormState: (state: any) => void;
}

const AdminForm: React.FC<AdminFormProps> = ({
  section,
  formState,
  isEditing,
  onInputChange,
  onSelectChange,
  onFileSelect,
  onSubmit,
  setFormState
}) => {
  const renderNewsForm = () => (
    <div className="space-y-4">
      <Input name="title" placeholder="Title" value={formState.title || ''} onChange={onInputChange} />
      <Textarea name="content" placeholder="Content" value={formState.content || ''} onChange={onInputChange} />
      <Input name="excerpt" placeholder="Excerpt" value={formState.excerpt || ''} onChange={onInputChange} />
      <Input name="author" placeholder="Author" value={formState.author || ''} onChange={onInputChange} />
      <Input name="date" type="date" placeholder="Date" value={formState.date || ''} onChange={onInputChange} />
      <Select name="category" value={formState.category || ''} onValueChange={(value) => onSelectChange('category', value)}>
        <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="Politics">Politics</SelectItem>
          <SelectItem value="Business">Business</SelectItem>
          <SelectItem value="Tech">Tech</SelectItem>
          <SelectItem value="Sports">Sports</SelectItem>
          <SelectItem value="Employment">Employment</SelectItem>
          <SelectItem value="Health">Health</SelectItem>
          <SelectItem value="My Story">My Story</SelectItem>
          <SelectItem value="Agricultural">Agricultural</SelectItem>
          <SelectItem value="Education">Education</SelectItem>
        </SelectContent>
      </Select>
      <Input name="tags" placeholder="Tags (comma-separated)" value={formState.tags || ''} onChange={onInputChange} />
      <Select name="status" value={formState.status || 'draft'} onValueChange={(value) => onSelectChange('status', value)}>
        <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="published">Published</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="featured" id="featured" checked={formState.featured || false} onChange={(e) => setFormState({...formState, featured: e.target.checked})} />
          <label htmlFor="featured">Featured Article</label>
        </div>
        <Select name="priority" value={formState.priority || 'medium'} onValueChange={(value) => onSelectChange('priority', value)}>
          <SelectTrigger className="w-32"><SelectValue placeholder="Priority" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <MediaUpload label="Media" accept="image/*,video/*,application/pdf" onFilesSelect={onFileSelect} existingFiles={formState.media || []} />
      <Button onClick={onSubmit}>{isEditing ? 'Update' : 'Create'} News Article</Button>
    </div>
  );

  const renderPublicationForm = () => (
    <div className="space-y-4">
      <Input name="title" placeholder="Title" value={formState.title || ''} onChange={onInputChange} />
      <Input name="author" placeholder="Author" value={formState.author || ''} onChange={onInputChange} />
      <Input name="publicationDate" type="date" placeholder="Publication Date" value={formState.publicationDate || ''} onChange={onInputChange} />
      <Textarea name="abstract" placeholder="Abstract" value={formState.abstract || ''} onChange={onInputChange} />
      <Input name="tags" placeholder="Tags (comma-separated)" value={formState.tags || ''} onChange={onInputChange} />
      <MediaUpload label="Media" accept="image/*,video/*,application/pdf" onFilesSelect={onFileSelect} existingFiles={formState.media || []} />
      <Button onClick={onSubmit}>{isEditing ? 'Update' : 'Create'} Publication</Button>
    </div>
  );

  const renderTeachingForm = () => (
    <div className="space-y-4">
      <Input name="title" placeholder="Title" value={formState.title || ''} onChange={onInputChange} />
      <Textarea name="description" placeholder="Description" value={formState.description || ''} onChange={onInputChange} />
      <Select name="level" value={formState.level || ''} onValueChange={(value) => onSelectChange('level', value)}>
        <SelectTrigger><SelectValue placeholder="Level" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="Beginner">Beginner</SelectItem>
          <SelectItem value="Intermediate">Intermediate</SelectItem>
          <SelectItem value="Advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>
      <Input name="tags" placeholder="Tags (comma-separated)" value={formState.tags || ''} onChange={onInputChange} />
      <MediaUpload label="Media" accept="image/*,video/*,application/pdf" onFilesSelect={onFileSelect} existingFiles={formState.media || []} />
      <Button onClick={onSubmit}>{isEditing ? 'Update' : 'Create'} Teaching Item</Button>
    </div>
  );

  const renderYoutubeForm = () => (
    <div className="space-y-4">
      <Input name="title" placeholder="Video Title" value={formState.title || ''} onChange={onInputChange} />
      <Textarea name="description" placeholder="Description" value={formState.description || ''} onChange={onInputChange} />
      <Input name="url" placeholder="YouTube URL" value={formState.url || ''} onChange={onInputChange} />
      <MediaUpload
        label="Custom Thumbnail"
        accept="image/*"
        onFilesSelect={onFileSelect}
        existingFiles={formState.media || []}
        multiple={false}
        maxFiles={1}
      />
      <div className="flex items-center space-x-2">
        <input type="checkbox" name="isActive" id="isActive" checked={formState.isActive === undefined ? true : formState.isActive} onChange={(e) => setFormState({...formState, isActive: e.target.checked})} />
        <label htmlFor="isActive">Is Active</label>
      </div>
      <Button onClick={onSubmit}>{isEditing ? 'Update' : 'Create'} Video</Button>
    </div>
  );

  const renderAgricultureForm = () => (
    <div className="space-y-4">
      <Input name="title" placeholder="Title" value={formState.title || ''} onChange={onInputChange} />
      <Textarea name="content" placeholder="Content" value={formState.content || ''} onChange={onInputChange} />
      <Input name="category" placeholder="Category" value={formState.category || ''} onChange={onInputChange} />
      <Input name="tags" placeholder="Tags (comma-separated)" value={formState.tags || ''} onChange={onInputChange} />
      <MediaUpload label="Media" accept="image/*,video/*,application/pdf" onFilesSelect={onFileSelect} existingFiles={formState.media || []} />
      <Button onClick={onSubmit}>{isEditing ? 'Update' : 'Create'} Agriculture Item</Button>
    </div>
  );

  const renderEducationForm = () => (
    <div className="space-y-4">
      <Input name="title" placeholder="Title" value={formState.title || ''} onChange={onInputChange} />
      <Textarea name="description" placeholder="Description" value={formState.description || ''} onChange={onInputChange} />
      <Input name="subject" placeholder="Subject" value={formState.subject || ''} onChange={onInputChange} />
      <Select name="level" value={formState.level || ''} onValueChange={(value) => onSelectChange('level', value)}>
        <SelectTrigger><SelectValue placeholder="Level" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="Beginner">Beginner</SelectItem>
          <SelectItem value="Intermediate">Intermediate</SelectItem>
          <SelectItem value="Advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>
      <MediaUpload label="Media" accept="image/*,video/*,application/pdf" onFilesSelect={onFileSelect} existingFiles={formState.media || []} />
      <Button onClick={onSubmit}>{isEditing ? 'Update' : 'Create'} Education Item</Button>
    </div>
  );

  const renderAdvertisementForm = () => (
    <div className="space-y-4">
      <Input name="title" placeholder="Title" value={formState.title || ''} onChange={onInputChange} />
      <Textarea name="description" placeholder="Description" value={formState.description || ''} onChange={onInputChange} />
      <Input name="client" placeholder="Client" value={formState.client || ''} onChange={onInputChange} />
      <Input name="link" placeholder="Advertisement Link" value={formState.link || ''} onChange={onInputChange} />
      <Select name="type" value={formState.type || 'banner'} onValueChange={(value) => onSelectChange('type', value)}>
        <SelectTrigger><SelectValue placeholder="Advertisement Type" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="banner">Banner</SelectItem>
          <SelectItem value="sidebar">Sidebar</SelectItem>
          <SelectItem value="inline">Inline</SelectItem>
        </SelectContent>
      </Select>
      <Input name="startDate" type="date" placeholder="Start Date" value={formState.startDate || ''} onChange={onInputChange} />
      <Input name="endDate" type="date" placeholder="End Date" value={formState.endDate || ''} onChange={onInputChange} />
      <div className="flex items-center space-x-2">
        <input type="checkbox" name="isActive" id="adIsActive" checked={formState.isActive === undefined ? true : formState.isActive} onChange={(e) => setFormState({...formState, isActive: e.target.checked})} />
        <label htmlFor="adIsActive">Is Active</label>
      </div>
      <MediaUpload label="Media (Image or Video)" accept="image/*,video/*" onFilesSelect={onFileSelect} existingFiles={formState.media || []} />
      <Button onClick={onSubmit}>{isEditing ? 'Update' : 'Create'} Advertisement</Button>
    </div>
  );

  const renderNewsCrawlForm = () => (
    <div className="space-y-4">
      <Input name="text" placeholder="Breaking news text" value={formState.text || ''} onChange={onInputChange} />
      <Input name="image" placeholder="Image URL" value={formState.image || ''} onChange={onInputChange} />
      <Input name="order" type="number" placeholder="Display order" value={formState.order || ''} onChange={onInputChange} />
      <div className="flex items-center space-x-2">
        <input type="checkbox" name="isActive" id="crawlActive" checked={formState.isActive === undefined ? true : formState.isActive} onChange={(e) => setFormState({...formState, isActive: e.target.checked})} />
        <label htmlFor="crawlActive">Is Active</label>
      </div>
      <Button onClick={onSubmit}>{isEditing ? 'Update' : 'Create'} Breaking News</Button>
    </div>
  );

  const renderAdPackageForm = () => (
    <div className="space-y-4">
      <Input name="name" placeholder="Package Name" value={formState.name || ''} onChange={onInputChange} />
      <Input name="price" placeholder="Price (e.g., $299)" value={formState.price || ''} onChange={onInputChange} />
      <Input name="period" placeholder="Period (e.g., per month)" value={formState.period || ''} onChange={onInputChange} />
      <Textarea name="features" placeholder="Features (comma-separated)" value={formState.features || ''} onChange={onInputChange} />
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="popular" id="popular" checked={formState.popular || false} onChange={(e) => setFormState({...formState, popular: e.target.checked})} />
          <label htmlFor="popular">Popular Package</label>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="isActive" id="packageActive" checked={formState.isActive === undefined ? true : formState.isActive} onChange={(e) => setFormState({...formState, isActive: e.target.checked})} />
          <label htmlFor="packageActive">Is Active</label>
        </div>
      </div>
      <Button onClick={onSubmit}>{isEditing ? 'Update' : 'Create'} Package</Button>
    </div>
  );

  switch(section) {
    case 'news':
    case 'politics':
    case 'business':
    case 'tech':
    case 'sports':
    case 'employment':
    case 'health':
    case 'mystory':
      return renderNewsForm();
    case 'publications':
      return renderPublicationForm();
    case 'teaching':
      return renderTeachingForm();
    case 'youtube':
      return renderYoutubeForm();
    case 'agriculture':
      return renderAgricultureForm();
    case 'education':
      return renderEducationForm();
    case 'advertisements':
      return renderAdvertisementForm();
    case 'newsCrawl':
      return renderNewsCrawlForm();
    case 'adPackages':
      return renderAdPackageForm();
    default:
      return <p>Select a section to manage content.</p>;
  }
};

export default AdminForm;
