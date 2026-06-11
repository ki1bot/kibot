import { CommentCard } from "@/components/cards/CommentCard";
import { CommentForm } from "@/components/forms/CommentForm";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function CommentsSection({ comments }) {
  return (
    <section id="comments" className="border-t border-white/10 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <RevealOnScroll>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-200/70">
                Comments
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Tinggalkan komentar
              </h2>

              <p className="mt-5 leading-8 text-blue-100/70">
                Komentar akan disimpan ke tabel Supabase{" "}
                <span className="font-medium text-blue-100">
                  portfolio_comments
                </span>
                . Berdasarkan RLS kamu, user publik boleh menambahkan komentar
                selama{" "}
                <span className="font-medium text-blue-100">is_pinned</span>{" "}
                bernilai false.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={120} className="mt-8">
              <CommentForm />
            </RevealOnScroll>
          </div>

          <div className="space-y-4">
            {comments.map((comment, index) => (
              <RevealOnScroll key={comment.id} delay={index * 100}>
                <CommentCard comment={comment} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
