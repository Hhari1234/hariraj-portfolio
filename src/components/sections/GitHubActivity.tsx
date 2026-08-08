import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

const username = profile.github.split("/").pop() ?? "";

export function GitHubActivity() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="github" className="py-24 md:py-32 relative">
      <div className="container-page">
<SectionHeader
          index="07"
          eyebrow="Developer Activity"
          title="Building in Public"
          description="Open-source work and contributions, available on GitHub."
        />

        <Reveal>
          <div className="rounded-2xl border border-line bg-surface/40 p-6 md:p-9">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 mb-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-signal/10 text-signal-2">
                  <GithubIcon width={24} height={24} />
                </div>
                <div>
                  <h3 className="text-text font-medium text-lg">@{username}</h3>
                  <p className="text-text-dim text-sm">github.com/{username}</p>
                </div>
              </div>
              <Button
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                variant="secondary"
                icon={<ArrowUpRight size={15} />}
                className="md:ml-auto"
              >
                View Profile
              </Button>
            </div>

            {!imgError ? (
              <div className="rounded-xl border border-line-soft bg-void/40 p-3 overflow-x-auto">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img
                  src={`https://ghchart.rshah.org/5b7cfa/${username}`}
                  alt={`GitHub contribution graph for ${username}`}
                  loading="lazy"
                  decoding="async"
                  onError={() => setImgError(true)}
                  className="w-full min-w-[600px]"
                />
              </div>
            ) : (
              <div className="rounded-xl border border-line-soft bg-void/40 p-8 text-center text-text-dim text-sm font-mono">
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
