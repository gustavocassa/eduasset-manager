import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { mockUsers, User } from "@/lib/mockData";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({ username: "", nationalId: "", fullName: "", role: "user" as "admin" | "user" });

  const handleCreate = () => {
    if (!newUser.username || !newUser.fullName) {
      toast.error("Username and full name are required");
      return;
    }
    setUsers((prev) => [...prev, { ...newUser, id: String(Date.now()) }]);
    setNewUser({ username: "", nationalId: "", fullName: "", role: "user" });
    toast.success("User created successfully");
  };

  const handleUpdate = () => {
    if (!editUser) return;
    setUsers((prev) => prev.map((u) => (u.id === editUser.id ? editUser : u)));
    setEditUser(null);
    toast.success("User updated successfully");
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success("User deleted successfully");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">{users.length} users registered</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>National ID</Label>
                <Input value={newUser.nationalId} onChange={(e) => setNewUser({ ...newUser, nationalId: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={newUser.fullName} onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={newUser.role} onValueChange={(v) => setNewUser({ ...newUser, role: v as "admin" | "user" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <DialogClose asChild><Button onClick={handleCreate}>Create</Button></DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>National ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.nationalId}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"} className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setEditUser({ ...user })}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                          </DialogHeader>
                          {editUser && (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Username</Label>
                                <Input value={editUser.username} onChange={(e) => setEditUser({ ...editUser, username: e.target.value })} />
                              </div>
                              <div className="space-y-2">
                                <Label>National ID</Label>
                                <Input value={editUser.nationalId} onChange={(e) => setEditUser({ ...editUser, nationalId: e.target.value })} />
                              </div>
                              <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input value={editUser.fullName} onChange={(e) => setEditUser({ ...editUser, fullName: e.target.value })} />
                              </div>
                              <div className="space-y-2">
                                <Label>Role</Label>
                                <Select value={editUser.role} onValueChange={(v) => setEditUser({ ...editUser, role: v as "admin" | "user" })}>
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                            <DialogClose asChild><Button onClick={handleUpdate}>Save</Button></DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete user {user.username}?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(user.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
