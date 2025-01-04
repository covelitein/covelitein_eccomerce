'use client'

// Settings Component
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDialogForSettings } from "@/store/use-dialog";
import { User, Lock, Bell, CreditCard } from "lucide-react";
import { Account } from "../modalContents";

const tabs = [
  {
    value: "account",
    label: "Account",
    icon: User,
    content: (
      <div className="px-5 py-4">
        <h4 className="text-lg font-medium">Account Settings</h4>
        <p className="text-sm text-gray-600">
          Update your personal details and preferences here.
        </p>
        <Account />
      </div>
    ),
  },
  {
    value: "security",
    label: "Security",
    icon: Lock,
    content: (
      <div>
        <h4 className="text-lg font-medium">Security Settings</h4>
        <p className="text-sm text-gray-600">
          Manage your passwords, 2FA, and security questions.
        </p>
      </div>
    ),
  },
];

export function Settings() {
  const { isOpen, close } = useDialogForSettings();

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? close : undefined}>
      <DialogContent className="max-w-full md:max-w-5xl h-full md:h-11/12 overflow-y-scroll px-4 md:px-6">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Customize your account settings</DialogDescription>
        </DialogHeader>
        <section>
          <Tabs
            defaultValue="account"
            orientation="vertical"
            className="flex flex-col md:flex-row gap-4"
          >
            <TabsList className="flex flex-row md:flex-col items-start justify-start py-3 box-border h-auto bg-gray-100 w-full md:w-[15rem] px-3">
              {tabs.map(({ value, label, icon: Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="data-[state=active]:text-blue-500 data-[state=active]:bg-white w-full data-[state=active]:shadow-none flex justify-start py-3 gap-2"
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map(({ value, content }) => (
              <TabsContent className="flex-1" key={value} value={value}>
                {content}
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </DialogContent>
    </Dialog>
  );
}
