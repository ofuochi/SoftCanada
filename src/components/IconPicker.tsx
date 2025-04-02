import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Trash2, Search } from "lucide-react";
import { wrapFieldsWithMeta } from "tinacms";
import * as Icons from "react-icons/fa";

export const IconPicker = wrapFieldsWithMeta(({ input, field }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Get the current icon component
  const CurrentIcon = input.value
    ? Icons[input.value as keyof typeof Icons]
    : null;

  // Filter icons based on search term
  const filteredIcons = Object.entries(Icons)
    .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 100); // Limit to 100 for performance

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger className="group relative flex h-24 w-24 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition-colors hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
        {CurrentIcon ? (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                input.onChange("");
              }}
              className="absolute right-1 top-1 rounded p-1 opacity-0 transition-opacity hover:bg-gray-100 group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
            <CurrentIcon className="h-12 w-12 text-gray-800" />
          </>
        ) : (
          <div className="text-center text-sm text-gray-500">Select Icon</div>
        )}
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={5}
          className="z-[10000] w-[360px] rounded-lg bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="mb-3 flex items-center rounded-md border border-gray-200 px-3 py-2">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search icons..."
              className="ml-2 w-full border-none p-0 focus:outline-none focus:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          <div className="grid max-h-[300px] grid-cols-5 gap-2 overflow-y-auto">
            {filteredIcons.map(([name, Icon]) => (
              <button
                key={name}
                className={`flex h-12 w-12 items-center justify-center rounded-md transition-colors ${
                  input.value === name
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  input.onChange(name);
                  setIsOpen(false);
                }}
                title={name}
              >
                <Icon className="h-6 w-6" />
              </button>
            ))}
          </div>

          {filteredIcons.length === 0 && (
            <div className="py-4 text-center text-sm text-gray-500">
              No icons found
            </div>
          )}

          <div className="mt-3 flex justify-end">
            <Popover.Close className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
              Close
            </Popover.Close>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}) as React.FC<any>;
