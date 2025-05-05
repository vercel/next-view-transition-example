import { useState } from "react";
import LaptopModel from "../components/LaptopModel";
import projects from "./projects.json";
import { Project } from "./types";

export default function CodeView() {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

  return (
    <div
      className="min-h-screen px-8 py-12 transition-colors duration-500"
      style={{ backgroundColor: selectedProject?.backgroundColor }}
    >
      {/* Floating projects row */}
      <div className="flex justify-center flex-wrap gap-8 mb-4">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="w-[200px] h-[150px] cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <p className="text-center p-2">{project.name}</p>
            <LaptopModel imageSrc={project.projectImage} />
          </div>
        ))}
      </div>

      <div className="container mx-auto" style={{ color: "#ffffff" }}>
        {/* Title and Description */}
        <div className="text-center mb-10">
          <h1 className="text-[80px] font-serif">{selectedProject.name}</h1>
          <p className="text-2xl max-w-3xl mx-auto">
            {selectedProject.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="flex justify-around gap-16">
          {/* Stack */}
          <div className="flex flex-col gap-4 items-center justify-center">
            <h2 className="text-4xl font-bold mb-4">STACK</h2>
            <ul className="space-y-4 text-xl">
              {selectedProject.stack.map((stack) => (
                <li key={stack}>{stack}</li>
              ))}
            </ul>
          </div>

          {/* Project Preview */}
          <div className="w-[800px] h-[460px]">
            <iframe
              src={selectedProject.projectLink}
              className="w-full h-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
