import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  FALLBACK_CERTIFICATES,
  FALLBACK_COMMENTS,
  FALLBACK_PROJECTS,
} from "@/lib/constants";
import {
  createPdfUrlFromImageUrl,
  resolveAssetUrl,
} from "@/lib/supabase-storage";

function normalizeProject(project) {
  return {
    ...project,
    img: resolveAssetUrl(project.img),
  };
}

function normalizeCertificate(certificate) {
  const normalizedImageUrl = resolveAssetUrl(certificate.img);
  const normalizedPdfUrl = certificate.pdf_url
    ? resolveAssetUrl(certificate.pdf_url)
    : createPdfUrlFromImageUrl(certificate.img);

  return {
    ...certificate,
    img: normalizedImageUrl,
    pdf_url: normalizedPdfUrl,
  };
}

function normalizeComment(comment) {
  return {
    ...comment,
    profile_image: resolveAssetUrl(comment.profile_image),
  };
}

function normalizeProjects(projects) {
  return projects.map(normalizeProject);
}

function normalizeCertificates(certificates) {
  return certificates.map(normalizeCertificate);
}

function normalizeComments(comments) {
  return comments.map(normalizeComment);
}

export async function getProjects() {
  if (!isSupabaseConfigured || !supabase) {
    return normalizeProjects(FALLBACK_PROJECTS);
  }

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, title, description, img, link, github, features, tech_stack, order_index, created_at",
    )
    .eq("is_published", true)
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch projects:", error.message);
    return normalizeProjects(FALLBACK_PROJECTS);
  }

  return data?.length
    ? normalizeProjects(data)
    : normalizeProjects(FALLBACK_PROJECTS);
}

export async function getCertificates() {
  if (!isSupabaseConfigured || !supabase) {
    return normalizeCertificates(FALLBACK_CERTIFICATES);
  }

  const { data, error } = await supabase
    .from("certificates")
    .select("id, title, img, type, order_index, created_at")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch certificates:", error.message);
    return normalizeCertificates(FALLBACK_CERTIFICATES);
  }

  return data?.length
    ? normalizeCertificates(data)
    : normalizeCertificates(FALLBACK_CERTIFICATES);
}

export async function getComments() {
  if (!isSupabaseConfigured || !supabase) {
    return normalizeComments(FALLBACK_COMMENTS);
  }

  const { data, error } = await supabase
    .from("portfolio_comments")
    .select("id, content, user_name, profile_image, is_pinned, created_at")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch comments:", error.message);
    return normalizeComments(FALLBACK_COMMENTS);
  }

  return data?.length
    ? normalizeComments(data)
    : normalizeComments(FALLBACK_COMMENTS);
}

export async function getPortfolioData() {
  const [projects, certificates, comments] = await Promise.all([
    getProjects(),
    getCertificates(),
    getComments(),
  ]);

  return {
    projects,
    certificates,
    comments,
  };
}
