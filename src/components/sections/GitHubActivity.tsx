import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowUpRightIcon, GithubIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";

const username = profile.github.split("/").pop() ?? "";

export function GitHubActivity() {
  const [imgError, setImgError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="github" className="py-20 md:py-28 relative">
      <div className="film-grain" aria-hidden="true" />
      <div className="container relative">
        <SectionHeader
          index="06"
          eyebrow="Developer Activity"
          title="Building in public on GitHub."
          description="Open-source contributions and projects — contribution graph rendered live from GitHub data."
          align="center"
        />

        <Reveal>
          <div className="card p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <GithubIcon width={24} height={24} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-text font-medium text-lg">@{username}</h3>
                  <p className="text-text-muted text-sm">github.com/{username}</p>
                </div>
              </div>
              <Button
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                variant="secondary"
                icon={<ArrowUpRightIcon width={15} height={15} />}
                className="md:ml-auto self-center"
              >
                View Profile
              </Button>
            </div>

            {!imgError ? (
              <div className="rounded-lg border border-border bg-surface-elevated p-3 overflow-x-auto relative">
                {!loaded && (
                  <div className="absolute inset-0 flex items-center justify-center text-text-faint font-mono text-sm">
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
                  style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
                />
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-surface-elevated p-8 text-center text-text-muted text-sm font-mono">
                Contribution graph unavailable — view activity directly on GitHub.
              </div>
            )}

            <p className="mt-4 text-text-faint text-xs font-mono">
              Chart rendered live from GitHub's public contribution data — nothing here is
              fabricated or estimated.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}