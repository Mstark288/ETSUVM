// src/pages/Dashboard.tsx - Improved Version
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { uploadToCloudinary, deleteFromCloudinary } from '../lib/cloudinary';
import { useAuth } from '../hooks/useAuth';
import MainLayout from '../components/layout/MainLayout';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { 
  FiDownload, 
  FiEye, 
  FiTrash2, 
  FiEdit2,
  FiFile,
  FiLoader,
  FiFileText,
  FiImage,
  FiUpload,
  FiSearch,
  FiFilter,
  FiX,
  FiGrid,
  FiList,
  FiFolder,
  FiChevronDown,
  FiExternalLink,
  FiMaximize2
} from 'react-icons/fi';

interface DocumentItem {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  publicId: string;
  secureUrl: string;
  uploadedBy: string;
  createdAt: any;
  updatedAt: any;
}

type ViewMode = 'list' | 'grid';
type FilterType = 'all' | 'pdf' | 'document' | 'spreadsheet' | 'presentation' | 'image';

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editingDoc, setEditingDoc] = useState<DocumentItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'size'>('newest');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'documents'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(docSnapshot => ({
        id: docSnapshot.id,
        ...docSnapshot.data()
      } as DocumentItem));
      setDocuments(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredDocuments = useMemo(() => {
    let filtered = documents;

    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(doc => {
        const type = getDocumentCategory(doc.fileType, doc.fileName);
        return type === filterType;
      });
    }

    switch (sortBy) {
      case 'newest':
        filtered = [...filtered].sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        break;
      case 'oldest':
        filtered = [...filtered].sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'size':
        filtered = [...filtered].sort((a, b) => b.fileSize - a.fileSize);
        break;
    }

    return filtered;
  }, [documents, searchQuery, filterType, sortBy]);

  const getDocumentCategory = (fileType: string, fileName: string): FilterType => {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    const type = fileType.toLowerCase();

    if (type.includes('pdf') || ext === 'pdf') return 'pdf';
    if (type.includes('image') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
    if (type.includes('spreadsheet') || ['xls', 'xlsx', 'csv'].includes(ext)) return 'spreadsheet';
    if (type.includes('presentation') || ['ppt', 'pptx'].includes(ext)) return 'presentation';
    if (type.includes('document') || ['doc', 'docx', 'txt', 'rtf'].includes(ext)) return 'document';
    return 'document';
  };

  const getFileIcon = (fileType: string, fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    const type = fileType.toLowerCase();

    if (type.includes('pdf') || ext === 'pdf') {
      return { icon: FiFileText, color: 'text-red-500', bg: 'bg-red-50', label: 'PDF' };
    }
    if (type.includes('image') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
      return { icon: FiImage, color: 'text-green-500', bg: 'bg-green-50', label: 'Image' };
    }
    if (type.includes('spreadsheet') || ['xls', 'xlsx', 'csv'].includes(ext)) {
      return { icon: FiFile, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Sheet' };
    }
    if (type.includes('presentation') || ['ppt', 'pptx'].includes(ext)) {
      return { icon: FiFile, color: 'text-orange-500', bg: 'bg-orange-50', label: 'Slides' };
    }
    if (type.includes('document') || ['doc', 'docx'].includes(ext)) {
      return { icon: FiFileText, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Doc' };
    }
    return { icon: FiFile, color: 'text-gray-500', bg: 'bg-gray-50', label: 'File' };
  };

  const getDocumentTypeLabel = (fileType: string, fileName: string): string => {
    const category = getDocumentCategory(fileType, fileName);
    switch (category) {
      case 'pdf': return 'PDF Document';
      case 'document': return 'Word Document';
      case 'spreadsheet': return 'Spreadsheet';
      case 'presentation': return 'Presentation';
      case 'image': return 'Image';
      default: return 'File';
    }
  };

  const canPreview = (fileType: string, fileName: string): boolean => {
    const category = getDocumentCategory(fileType, fileName);
    return category === 'pdf' || category === 'image';
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle.trim()) return;

    setUploading(true);
    setUploadError('');
    setUploadProgress(0);
    
    try {
      const result = await uploadToCloudinary(uploadFile);
      
      await addDoc(collection(db, 'documents'), {
        title: uploadTitle.trim(),
        fileName: uploadFile.name,
        fileType: result.resource_type === 'image' ? `image/${result.format}` : `application/${result.format}`,
        fileSize: result.bytes,
        publicId: result.public_id,
        secureUrl: result.secure_url,
        uploadedBy: user?.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setUploadTitle('');
      setUploadFile(null);
      setShowUpload(false);
      setUploadProgress(100);
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Failed to upload document.');
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const handleDelete = async (document: DocumentItem) => {
    if (!confirm(`Delete "${document.title}"?`)) return;

    setDeletingId(document.id);
    try {
      await deleteFromCloudinary(document.publicId);
      await deleteDoc(doc(db, 'documents', document.id));
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete document. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc || !editTitle.trim()) return;

    setSaving(true);
    try {
      await updateDoc(doc(db, 'documents', editingDoc.id), {
        title: editTitle.trim(),
        updatedAt: serverTimestamp()
      });
      setEditingDoc(null);
      setEditTitle('');
    } catch (error) {
      console.error('Edit error:', error);
      alert('Failed to update document.');
    } finally {
      setSaving(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp?.seconds) return 'N/A';
    return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        setUploadFile(null);
        return;
      }
      setUploadFile(file);
      setUploadError('');
    }
  };

  const DocumentSkeleton = () => (
    <div className="animate-pulse bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  );

  const filterButtons: { label: string; value: FilterType; icon: any }[] = [
    { label: 'All Files', value: 'all', icon: FiFolder },
    { label: 'PDF', value: 'pdf', icon: FiFileText },
    { label: 'Documents', value: 'document', icon: FiFileText },
    { label: 'Spreadsheets', value: 'spreadsheet', icon: FiFile },
    { label: 'Presentations', value: 'presentation', icon: FiFile },
    { label: 'Images', value: 'image', icon: FiImage },
  ];

  return (
    <MainLayout onUpload={() => setShowUpload(true)}>
      {/* Header with Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">Documents</h1>
            <p className="text-sm text-gray-500 mt-1">
              {filteredDocuments.length} {filteredDocuments.length === 1 ? 'file' : 'files'} available
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <FiSearch className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ets-gold w-full sm:w-64"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FiFilter className="w-4 h-4" />
                Filter
                <FiChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2"
                  >
                    {filterButtons.map((filter) => {
                      const FilterIcon = filter.icon;
                      return (
                        <button
                          key={filter.value}
                          onClick={() => {
                            setFilterType(filter.value);
                            setShowFilters(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                            filterType === filter.value
                              ? 'bg-ets-navy text-white'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <FilterIcon className="w-4 h-4" />
                          {filter.label}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ets-gold"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="size">Largest First</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-ets-navy text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                title="List view"
              >
                <FiList className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-ets-navy text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                title="Grid view"
              >
                <FiGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <DocumentSkeleton key={i} />
          ))}
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="text-center py-20">
          <FiFile className="text-5xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No documents found</p>
          {searchQuery || filterType !== 'all' ? (
            <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
          ) : (
            isAdmin && (
              <Button onClick={() => setShowUpload(true)} className="mt-4">
                Upload First Document
              </Button>
            )
          )}
        </div>
      ) : viewMode === 'list' ? (
        <div className="space-y-2">
          {filteredDocuments.map((document) => {
            const { icon: FileIcon, color, bg } = getFileIcon(document.fileType, document.fileName);
            const previewable = canPreview(document.fileType, document.fileName);
            return (
              <motion.div
                key={document.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
                      <FileIcon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{document.title}</h3>
                      <p className="text-xs text-gray-500">
                        {getDocumentTypeLabel(document.fileType, document.fileName)} • {formatFileSize(document.fileSize)} • {formatDate(document.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {previewable ? (
                      <button
                        onClick={() => setPreviewDoc(document)}
                        className="p-2 text-gray-500 hover:text-ets-navy transition-colors"
                        title="Preview"
                      >
                        <FiMaximize2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <a
                        href={document.secureUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-ets-navy transition-colors"
                        title="Open in new tab"
                      >
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={document.secureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-500 hover:text-ets-navy transition-colors"
                      title="Open"
                    >
                      <FiEye className="w-4 h-4" />
                    </a>
                    <a
                      href={document.secureUrl}
                      download={document.fileName}
                      className="p-2 text-gray-500 hover:text-ets-navy transition-colors"
                      title="Download"
                    >
                      <FiDownload className="w-4 h-4" />
                    </a>
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => {
                            setEditingDoc(document);
                            setEditTitle(document.title);
                          }}
                          className="p-2 text-gray-500 hover:text-ets-gold transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(document)}
                          disabled={deletingId === document.id}
                          className="p-2 text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === document.id ? (
                            <FiLoader className="animate-spin w-4 h-4" />
                          ) : (
                            <FiTrash2 className="w-4 h-4" />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((document) => {
            const { icon: FileIcon, color, bg} = getFileIcon(document.fileType, document.fileName);
            const previewable = canPreview(document.fileType, document.fileName);
            return (
              <motion.div
                key={document.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center`}>
                    <FileIcon className={`w-6 h-6 ${color}`} />
                  </div>
                  {isAdmin && (
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingDoc(document);
                          setEditTitle(document.title);
                        }}
                        className="p-1.5 text-gray-400 hover:text-ets-gold transition-colors"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(document)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                <h3 className="font-medium text-gray-900 mb-1 truncate">{document.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{getDocumentTypeLabel(document.fileType, document.fileName)}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>{formatFileSize(document.fileSize)}</span>
                  <span>{formatDate(document.createdAt)}</span>
                </div>

                <div className="flex space-x-2">
                  {previewable ? (
                    <button
                      onClick={() => setPreviewDoc(document)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-xs font-medium"
                    >
                      <FiMaximize2 className="w-3 h-3" />
                      Preview
                    </button>
                  ) : (
                    <a
                      href={document.secureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-xs font-medium"
                    >
                      <FiExternalLink className="w-3 h-3" />
                      Open
                    </a>
                  )}
                  <a
                    href={document.secureUrl}
                    download={document.fileName}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-ets-navy text-white rounded-lg hover:bg-ets-navy/90 transition-colors text-xs font-medium"
                  >
                    <FiDownload className="w-3 h-3" />
                    Download
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      <Modal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        title={previewDoc?.title || 'Preview'}
      >
        {previewDoc && (
          <div className="space-y-4">
            {getDocumentCategory(previewDoc.fileType, previewDoc.fileName) === 'pdf' ? (
              <iframe
                src={previewDoc.secureUrl}
                className="w-full h-96 rounded-lg border border-gray-200"
                title={previewDoc.title}
              />
            ) : (
              <img
                src={previewDoc.secureUrl}
                alt={previewDoc.title}
                className="w-full h-auto rounded-lg"
              />
            )}
            <div className="flex justify-end">
              <a
                href={previewDoc.secureUrl}
                download={previewDoc.fileName}
                className="inline-flex items-center gap-2 px-4 py-2 bg-ets-navy text-white rounded-lg hover:bg-ets-navy/90 transition-colors text-sm font-medium"
              >
                <FiDownload className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        )}
      </Modal>

      {/* Upload Modal */}
      <Modal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        title="Upload Document"
      >
        <form onSubmit={handleUpload} className="space-y-4">
          {uploadError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {uploadError}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ets-gold"
              placeholder="Document title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File (Max 10MB)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-ets-navy h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
          <Button
            type="submit"
            disabled={uploading}
            className="w-full"
          >
            {uploading ? (
              <>
                <FiLoader className="animate-spin mr-2 w-4 h-4" />
                Uploading...
              </>
            ) : (
              <>
                <FiUpload className="mr-2 w-4 h-4" />
                Upload
              </>
            )}
          </Button>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingDoc}
        onClose={() => setEditingDoc(null)}
        title="Edit Document"
      >
        <form onSubmit={handleEdit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ets-gold"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={saving}
            className="w-full"
          >
            {saving ? (
              <>
                <FiLoader className="animate-spin mr-2 w-4 h-4" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </form>
      </Modal>
    </MainLayout>
  );
}