import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowUpRightIcon, GithubIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";

const username = profile.github.split("/").pop() ?? "";

export function GitHubActivity() {
  const [imgError, setImgError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="github" className="py-24 md:py-32 relative">
      <div className="container relative">
        <SectionHeader
          index="06"
          eyebrow="Developer Activity"
          title="Building in public on GitHub."
          description="Open-source contributions and projects - contribution graph rendered live from GitHub data."
        />

        <Reveal>
          <div className="card p-6 md:p-8 min-w-0">
            <div className="card-head mb-8">
              <div className="card-icon card-icon--lg">
                <GithubIcon width={22} height={22} />
              </div>
              <div className="card-text">
                <h3 className="text-text font-medium text-lg">@{username}</h3>
                <p className="text-muted text-sm break-words">github.com/{username}</p>
              </div>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-secondary shrink-0 !min-h-[40px] !px-4 !py-2"
              >
                View profile
                <ArrowUpRightIcon width={15} height={15} />
              </a>
            </div>

            {!imgError ? (
              <div className="rounded-xl border border-line bg-surface-2 p-3 overflow-x-auto relative min-w-0">
                {!loaded && (
                  <div className="absolute inset-0 flex items-center justify-center text-subtle font-mono text-sm">
                    Loading contribution graph...
                  </div>
                )}
                <img
                  src={`https://ghchart.rshah.org/5b7cfa/${username}`}
                  alt={`GitHub contribution graph for ${username}`}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setLoaded(true)}
                  onError={() => setImgError(true)}
                  className="w-full min-w-[600px] block"
                  style={{ opacity: loaded ? 1 : 0 }}
                />
              </div>
            ) : (
              <div className="rounded-xl border border-line bg-surface-2 p-8 text-center text-muted text-sm font-mono">
                Contribution graph unavailable - view activity directly on GitHub.
              </div>
            )}

            <p className="mt-4 text-subtle text-xs font-mono">
              Chart rendered live from GitHub's public contribution data - nothing here is
              fabricated or estimated.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
