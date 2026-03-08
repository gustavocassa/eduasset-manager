import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockComputers, Computer } from "@/lib/mockData";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const Computers = () => {
  const [computers, setComputers] = useState<Computer[]>(mockComputers);
  const [search, setSearch] = useState("");

  const filtered = computers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.serialNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setComputers((prev) => prev.filter((c) => c.id !== id));
    toast.success("Computer deleted successfully");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Computer Inventory</h1>
          <p className="text-muted-foreground mt-1">{filtered.length} computers registered</p>
        </div>
        <Button asChild>
          <Link to="/computers/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Computer
          </Link>
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or serial..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((computer) => (
          <Card key={computer.id} className="shadow-sm hover:shadow-md transition-shadow group">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-foreground">{computer.name}</h3>
                <Badge
                  className={
                    computer.status === "working"
                      ? "bg-success text-success-foreground hover:bg-success/90"
                      : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  }
                >
                  {computer.status === "working" ? "Working" : "Not Working"}
                </Badge>
              </div>

              <div className="space-y-1.5 text-sm text-muted-foreground">
                <p><span className="font-medium text-foreground">S/N:</span> {computer.serialNumber}</p>
                <p><span className="font-medium text-foreground">CPU:</span> {computer.processor}</p>
                <p><span className="font-medium text-foreground">RAM:</span> {computer.ram}</p>
                <p><span className="font-medium text-foreground">Storage:</span> {computer.storage}</p>
              </div>

              <div className="flex gap-2 pt-2 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to={`/computers/${computer.id}/edit`}>
                    <Pencil className="mr-1.5 h-3.5 w-3.5" />
                    Edit
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 text-destructive hover:text-destructive">
                      <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete {computer.name}?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently remove the computer from the inventory.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(computer.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Computers;
