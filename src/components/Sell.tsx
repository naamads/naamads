import React, { useState, useEffect } from "react";
import {
  Car,
  Home,
  Smartphone,
  Briefcase,
  Bike,
  Monitor,
  Truck,
  Sofa,
  ArrowLeft,
  Camera,
  MapPin,
  IndianRupee,
  User,
  Phone,
  X,
} from "lucide-react";
import sellDataRaw from "../data/sellData.json";
import { toast } from "react-hot-toast";

type FieldType = "text" | "number" | "select";

type Field = {
  type: FieldType;
  label: string;
  required?: boolean;
  options?: string[] | "year_range";
};

type Subcategory = {
  id: string;
  name: string;
  fields: string[];
};

type Category = {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
};

type SellData = {
  categories: Category[];
  common_fields: Record<string, Field>;
};

type FileWithPreview = {
  file: File;
  preview: string;
  type: "image" | "video" | "audio";
};

const allowedTypes = ["text", "number", "select"] as const;
function fixFieldTypes(fields: Record<string, any>): Record<string, Field> {
  const result: Record<string, Field> = {};
  for (const key in fields) {
    const field = fields[key];
    if (allowedTypes.includes(field.type)) {
      result[key] = field as Field;
    }
  }
  return result;
}
const sellData: SellData = {
  ...sellDataRaw,
  common_fields: fixFieldTypes(sellDataRaw.common_fields),
};

const MAX_MEDIA_FILES = 4;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const iconMap: Record<string, React.ReactNode> = {
  Car: <Car className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Bike: <Bike className="w-6 h-6" />,
  Monitor: <Monitor className="w-6 h-6" />,
  Truck: <Truck className="w-6 h-6" />,
  Sofa: <Sofa className="w-6 h-6" />,
};

const Sell: React.FC = () => {
  const data: SellData = sellData;

  const [step, setStep] = useState<"category" | "details">("category");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [mediaFiles, setMediaFiles] = useState<FileWithPreview[]>([]);
  const [profileImage, setProfileImage] = useState<FileWithPreview | null>(null);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      mediaFiles.forEach((mf) => URL.revokeObjectURL(mf.preview));
      if (profileImage) URL.revokeObjectURL(profileImage.preview);
    };
  }, [mediaFiles, profileImage]);

  const handleCategoryClick = (category: Category) => {
    if (openCategoryId === category.id) {
      setOpenCategoryId(null);
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    } else {
      setOpenCategoryId(category.id);
      setSelectedCategory(category);
      setSelectedSubcategory(null);
    }
  };

  const handleSubcategorySelect = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    setStep("details");
    setOpenCategoryId(null);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: FileWithPreview[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds 5 MB`);
        continue;
      }

      let type: "image" | "video" | "audio" | null = null;
      if (file.type.startsWith("image/")) type = "image";
      else if (file.type.startsWith("video/")) type = "video";
      else if (file.type.startsWith("audio/")) type = "audio";

      if (!type) continue;
      if (mediaFiles.length + newFiles.length >= MAX_MEDIA_FILES) {
        toast.error("Max 4 media files allowed");
        break;
      }

      newFiles.push({
        file,
        preview: URL.createObjectURL(file),
        type,
      });
    }

    setMediaFiles((prev) => [...prev, ...newFiles]);
  };

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Profile image must be less than 5 MB");
      return;
    }

    setProfileImage({
      file,
      preview: URL.createObjectURL(file),
      type: "image",
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(formData.phone || "")) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    console.log({
      category: selectedCategory?.name,
      subcategory: selectedSubcategory?.name,
      ...formData,
      mediaFiles,
      profileImage,
    });

    toast.success("Ad Posted Successfully!");
  };

  if (step === "category") {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">POST YOUR AD</h1>
          <div className="max-w-4xl mx-auto space-y-4">
            {data.categories.map((cat) => (
              <div key={cat.id} className="bg-card border border-border rounded-lg overflow-hidden">
                <button
                  className={`w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors ${
                    openCategoryId === cat.id ? "bg-muted" : ""
                  }`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg flex items-center justify-center">
                    {iconMap[cat.icon]}
                  </div>
                  <span className="text-lg font-semibold">{cat.name}</span>
                </button>

                {openCategoryId === cat.id && cat.subcategories.length > 0 && (
                  <div className="border-t border-border p-4 bg-muted/50">
                    <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Choose a subcategory</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {cat.subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
                          onClick={() => handleSubcategorySelect(sub)}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const fields = selectedSubcategory?.fields || [];
  const commonFields = data.common_fields;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setStep("category")}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">POST YOUR AD</h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
          {/* Media Upload */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Add Photos / Video / Audio</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mediaFiles.map((mf, i) => (
                <div key={i} className="relative aspect-square bg-muted rounded-lg overflow-hidden group">
                  {mf.type === "image" && <img src={mf.preview} alt="media" className="w-full h-full object-cover" />}
                  {mf.type === "video" && <video src={mf.preview} className="w-full h-full object-cover" />}
                  {mf.type === "audio" && (
                    <div className="w-full h-full flex items-center justify-center">
                      <audio src={mf.preview} controls className="w-full" />
                    </div>
                  )}
                  <button
                    type="button"
                    className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setMediaFiles((prev) => prev.filter((_, idx) => idx !== i))}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {mediaFiles.length < MAX_MEDIA_FILES && (
                <label className="aspect-square bg-muted border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                  <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Add Media</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*,audio/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Dynamic Fields */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            {fields.map((fieldKey) => {
              const field = commonFields[fieldKey];
              if (!field) return null;

              const isRequired = field.required ?? false;

              if (field.type === "select") {
                const options =
                  field.options === "year_range"
                    ? Array.from({ length: 20 }, (_, i) => `${new Date().getFullYear() - i}`)
                    : field.options || [];

                return (
                  <div key={fieldKey}>
                    <label className="block text-sm font-medium mb-2">
                      {field.label}
                      {isRequired && <span className="text-destructive ml-1">*</span>}
                    </label>
                    <select
                      value={formData[fieldKey] || ""}
                      onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                      required={isRequired}
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select {field.label}</option>
                      {options.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              return (
                <div key={fieldKey}>
                  <label className="block text-sm font-medium mb-2">
                    {field.label}
                    {isRequired && <span className="text-destructive ml-1">*</span>}
                  </label>
                  <input
                    type={field.type}
                    value={formData[fieldKey] || ""}
                    onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                    required={isRequired}
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              );
            })}

            <div>
              <label className="block text-sm font-medium mb-2">
                Ad Title <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formData.title || ""}
                maxLength={70}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <span className="text-xs text-muted-foreground">{formData.title?.length || 0}/70</span>
            </div>

            {(selectedCategory?.id === "cars" || selectedCategory?.id === "bikes") && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    KM Driven <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.km_driven || ""}
                    onChange={(e) => handleInputChange("km_driven", e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    No. of Owners <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={formData.owners || ""}
                    onChange={(e) => handleInputChange("owners", e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="4+">4+</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                Description <span className="text-destructive">*</span>
              </label>
              <textarea
                value={formData.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Include condition, features and reason for selling"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Price <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="number"
                  value={formData.price || ""}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="Enter price"
                  required
                  className="w-full pl-12 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Location <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.location || ""}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Current Location"
                  required
                  className="w-full pl-12 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          {/* Review Section */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">Review Your Details</h3>
            
            <div className="flex justify-center">
              {profileImage ? (
                <div className="relative">
                  <img src={profileImage.preview} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setProfileImage(null)}
                    className="absolute top-0 right-0 p-1 bg-destructive text-destructive-foreground rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="w-24 h-24 bg-muted border-2 border-dashed border-border rounded-full flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                  <User className="w-8 h-8 text-muted-foreground" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Your Name <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  maxLength={30}
                  value={formData.name || ""}
                  placeholder="Your Name"
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <span className="text-xs text-muted-foreground">{formData.name?.length || 0}/30</span>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  value={formData.phone || ""}
                  placeholder="Your Number"
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Post Now
          </button>
          <p className="text-center text-sm text-muted-foreground">
            By posting, you agree to our Terms & Conditions
          </p>
        </form>
      </div>
    </div>
  );
};

export default Sell;
