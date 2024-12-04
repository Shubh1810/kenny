"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconPlus,
  IconDragDrop,
  IconPlayerPlay,
  IconCode,
  IconSettings,
  IconBrandPython,
  IconBrandJavascript,
  IconRobot,
  IconArrowRight,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { cn } from "../../lib/utils";

type WorkflowStep = {
  id: string;
  type: string;
  name: string;
  config: Record<string, any>;
  status: "pending" | "running" | "completed" | "error";
};

export function WorkflowAutomationView() {
  const [workflows, setWorkflows] = useState<WorkflowStep[]>([]);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const stepTypes = [
    { id: "python", name: "Python Script", icon: IconBrandPython },
    { id: "js", name: "JavaScript", icon: IconBrandJavascript },
    { id: "api", name: "API Call", icon: IconCode },
    { id: "ai", name: "AI Task", icon: IconRobot },
  ];

  const addWorkflowStep = (type: string) => {
    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      type,
      name: `New ${type} Step`,
      config: {},
      status: "pending",
    };
    setWorkflows([...workflows, newStep]);
  };

  const runWorkflow = async () => {
    setIsRunning(true);
    for (let step of workflows) {
      const updatedWorkflows = [...workflows];
      const stepIndex = updatedWorkflows.findIndex((s) => s.id === step.id);
      updatedWorkflows[stepIndex].status = "running";
      setWorkflows(updatedWorkflows);

      // Simulate step execution
      await new Promise((resolve) => setTimeout(resolve, 1500));

      updatedWorkflows[stepIndex].status = Math.random() > 0.2 ? "completed" : "error";
      setWorkflows(updatedWorkflows);
    }
    setIsRunning(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white/90 mb-2">
              Workflow Automation
            </h1>
            <p className="text-white/70">
              Build and automate complex workflows with drag-and-drop simplicity
            </p>
          </div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => runWorkflow()}
              disabled={isRunning || workflows.length === 0}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl",
                "bg-green-500 hover:bg-green-600 text-white",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-all duration-200"
              )}
            >
              <IconPlayerPlay className="w-5 h-5" />
              <span>Run Workflow</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20"
            >
              <IconSettings className="w-5 h-5" />
              <span>Settings</span>
            </motion.button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Workflow Steps Panel */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 min-h-[600px]">
              {workflows.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/50">
                  <IconDragDrop className="w-16 h-16 mb-4" />
                  <p className="text-lg mb-4">Start by adding workflow steps</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addWorkflowStep("python")}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
                  >
                    <IconPlus className="w-5 h-5" />
                    <span>Add Step</span>
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  {workflows.map((step, index) => (
                    <motion.div
                      key={step.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "bg-white/10 p-4 rounded-lg border border-white/10",
                        "hover:border-white/20 cursor-pointer",
                        selectedStep === step.id && "border-blue-500"
                      )}
                      onClick={() => setSelectedStep(step.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5">
                            {stepTypes.find(t => t.id === step.type)?.icon({ className: "w-6 h-6" })}
                          </div>
                          <div>
                            <h3 className="font-medium text-white/90">{step.name}</h3>
                            <p className="text-sm text-white/60">{step.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {step.status === "running" && (
                            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                          )}
                          {step.status === "completed" && (
                            <IconCheck className="w-5 h-5 text-green-500" />
                          )}
                          {step.status === "error" && (
                            <IconX className="w-5 h-5 text-red-500" />
                          )}
                          {index < workflows.length - 1 && (
                            <IconArrowRight className="w-5 h-5 text-white/30" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Available Steps */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h3 className="text-lg font-medium text-white/90 mb-4">Available Steps</h3>
              <div className="space-y-2">
                {stepTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addWorkflowStep(type.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10"
                  >
                    <type.icon className="w-5 h-5" />
                    <span>{type.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Step Configuration */}
            <AnimatePresence>
              {selectedStep && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-white/5 p-4 rounded-xl border border-white/10"
                >
                  <h3 className="text-lg font-medium text-white/90 mb-4">Step Configuration</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Step Name"
                      className="w-full bg-white/5 text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/20"
                    />
                    <textarea
                      placeholder="Configuration JSON"
                      className="w-full h-32 bg-white/5 text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/20"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
