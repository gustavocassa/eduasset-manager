import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ImportData = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (!file) {
      toast.error("Please select a TOML file first");
      return;
    }
    if (!file.name.endsWith(".toml")) {
      setStatus("error");
      toast.error("Invalid file format. Please upload a .toml file");
      return;
    }
    // Simulate processing
    setStatus("success");
    toast.success("TOML file processed successfully. Computer data imported.");
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Import TOML File</h1>
        <p className="text-muted-foreground mt-1">Upload a computer-generated TOML file to register or update equipment</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-5">
          <div
            className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground">
              {file ? file.name : "Click to select a TOML file"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Only .toml files are accepted</p>
            <input
              ref={inputRef}
              type="file"
              accept=".toml"
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files?.[0] ?? null);
                setStatus("idle");
              }}
            />
          </div>

          {file && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              <FileText className="h-5 w-5 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-success/10 text-success">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">File imported successfully</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Invalid file format</span>
            </div>
          )}

          <Button onClick={handleUpload} className="w-full" disabled={!file}>
            <Upload className="mr-2 h-4 w-4" />
            Upload & Process
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportData;
