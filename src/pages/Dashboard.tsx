import { Monitor, CheckCircle2, XCircle, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockComputers, mockHistory } from "@/lib/mockData";

const Dashboard = () => {
  const total = mockComputers.length;
  const working = mockComputers.filter((c) => c.status === "working").length;
  const notWorking = total - working;

  const stats = [
    { label: "Total Computers", value: total, icon: Monitor, color: "text-primary" },
    { label: "Working", value: working, icon: CheckCircle2, color: "text-success" },
    { label: "Not Working", value: notWorking, icon: XCircle, color: "text-destructive" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your IT asset inventory</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-muted ${s.color}`}>
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-3xl font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockHistory.slice(0, 5).map((record) => (
              <div key={record.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="mt-0.5">
                  <Badge
                    variant={record.action === "create" ? "default" : record.action === "update" ? "secondary" : "destructive"}
                    className="text-xs capitalize"
                  >
                    {record.action}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{record.computerName}</p>
                  <p className="text-xs text-muted-foreground">{record.description}</p>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">{record.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
