import { Clock3, Pin } from "lucide-react";

function formatCommentDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

export function CommentCard({ comment }) {
  const initial = comment.user_name?.charAt(0)?.toUpperCase() || "?";
  const formattedDate = formatCommentDate(comment.created_at);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-violet-300/20 hover:bg-white/7">
      {comment.is_pinned && (
        <div className="mb-3 inline-flex items-center gap-1 rounded-full border border-violet-300/15 bg-violet-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200">
          <Pin className="size-3" />
          Pinned Comment
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/10">
          {comment.profile_image ? (
            <img
              src={comment.profile_image}
              alt={comment.user_name || "Komentar pengguna"}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-white">{initial}</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white">
                {comment.user_name}
              </h3>

              {comment.is_pinned && (
                <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-medium text-violet-200">
                  Admin
                </span>
              )}
            </div>

            {formattedDate && (
              <span className="inline-flex items-center gap-1 text-xs text-blue-100/45">
                <Clock3 className="size-3" />
                {formattedDate}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm leading-7 text-blue-100/72">
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  );
}
