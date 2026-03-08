import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { mockComputers } from "@/lib/mockData";
import { ArrowLeft, Save } from "lucide-react";

const ComputerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? mockComputers.find((c) => c.id === id) : null;
  const isEdit = !!existing;

  const [form, setForm] = useState({
    name: existing?.name ?? "",
    serialNumber: existing?.serialNumber ?? "",
    processor: existing?.processor ?? "",
    ram: existing?.ram ?? "",
    storage: existing?.storage ?? "",
    status: existing ? existing.status === "working" : true,
    changeDescription: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.serialNumber) {
      toast.error("Computer name and serial number are required");
      return;
    }
    toast.success(isEdit ? "Computer updated successfully" : "Computer registered successfully");
    navigate("/computers");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isEdit ? "Edit Computer" : "Register Computer"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEdit ? `Editing ${existing?.name}` : "Add a new computer to the inventory"}
          </p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Computer Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. LAB-PC-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serial">Serial Number</Label>
                <Input id="serial" value={form.serialNumber} onChange={(e) => setForm({ ...form, serialNumber: e.target.value })} placeholder="e.g. SN-2024-0001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="processor">Processor</Label>
                <Input id="processor" value={form.processor} onChange={(e) => setForm({ ...form, processor: e.target.value })} placeholder="e.g. Intel Core i5-12400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ram">RAM</Label>
                <Input id="ram" value={form.ram} onChange={(e) => setForm({ ...form, ram: e.target.value })} placeholder="e.g. 16 GB" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storage">Storage</Label>
                <Input id="storage" value={form.storage} onChange={(e) => setForm({ ...form, storage: e.target.value })} placeholder="e.g. 512 GB SSD" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex items-center gap-3 h-10">
                  <Switch checked={form.status} onCheckedChange={(v) => setForm({ ...form, status: v })} />
                  <span className="text-sm text-muted-foreground">{form.status ? "Working" : "Not Working"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Change Description</Label>
              <Textarea id="desc" value={form.changeDescription} onChange={(e) => setForm({ ...form, changeDescription: e.target.value })} placeholder="Describe the changes or reason for registration..." rows={3} />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {isEdit ? "Update Computer" : "Register Computer"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComputerForm;
