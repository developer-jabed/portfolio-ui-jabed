import Link from "next/link";
import { Folder, Github, ExternalLink } from "lucide-react";

interface ProjectType {
    id: number;
    title: string;
    description: string;
    repoUrl: string;
    liveUrl: string;
    thumbnail: string; // add thumbnail field
}

interface ProjectsResponse {
    data: ProjectType[];
    total: number;
}

const fetchProjects = async (page = 1, limit = 6): Promise<ProjectsResponse> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project/all-project?page=${page}&limit=${limit}`,
        {
            next: { revalidate: 60 }, // ISR
        }
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch projects: ${res.status}`);
    }

    return res.json();
};


export default async function ProjectsPage({ searchParams }: { searchParams?: { page?: string } }) {
    const page = parseInt(searchParams?.page || "1");
    const limit = 6;

    let projects: ProjectType[] = [];
    let total = 0;

    try {
        const data = await fetchProjects(page, limit);
        projects = data.data;
        total = data.total;
    } catch (err) {
        console.error(err);
    }

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="bg-black text-white min-h-screen px-6 md:px-16 py-24">
            <h1 className="text-5xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                My Projects
            </h1>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-3 gap-10 mb-12">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="group bg-gray-900/50 p-6 rounded-2xl border border-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
                    >
                        {/* Thumbnail */}
                        {project.thumbnail && (
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                        )}

                        <div className="flex items-center gap-3 mb-4">
                            <Folder className="w-6 h-6 text-pink-400" />
                            <h2 className="text-2xl font-semibold">{project.title}</h2>
                        </div>
                        <p className="text-gray-300 mb-6 line-clamp-3">{project.description}</p>
                        <div className="flex gap-4">
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition"
                            >
                                <Github className="w-5 h-5" /> Github
                            </a>
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition"
                            >
                                <ExternalLink className="w-5 h-5" /> Live Demo
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex gap-4 justify-center flex-wrap">
                {page > 1 && (
                    <Link
                        href={`/projects?page=${page - 1}`}
                        className="px-4 py-2 rounded-lg bg-pink-400 hover:bg-pink-500 transition"
                    >
                        Previous
                    </Link>
                )}
                <span className="flex items-center gap-2">
                    Page <strong>{page}</strong> of {totalPages}
                </span>
                {page < totalPages && (
                    <Link
                        href={`/projects?page=${page + 1}`}
                        className="px-4 py-2 rounded-lg bg-pink-400 hover:bg-pink-500 transition"
                    >
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
}
