import { useState } from "react";
import { FileDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const ExportData = () => {
  const [table, setTable] = useState("");

  const handleExport = () => {
    if (!table) {
      toast.error("Please select a table to export");
      return;
    }
    toast.success(`Exported ${table} data as CSV`);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Export Data</h1>
        <p className="text-muted-foreground mt-1">Download inventory data as a CSV file</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-5">
          <div className="space-y-2">
            <Label>Select Table</Label>
            <Select value={table} onValueChange={setTable}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a table to export" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="computers">Computers</SelectItem>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="history">Change History</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleExport} className="w-full" disabled={!table}>
            <FileDown className="mr-2 h-4 w-4" />
            Export as CSV
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportData;
