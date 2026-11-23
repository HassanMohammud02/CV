export function incrementMetric(setAnalytics, field, amount = 1) {
  setAnalytics((prev) => ({
    ...prev,
    [field]: (prev[field] || 0) + amount,
  }));
}

export function incrementProjectView(setProjects, projectId) {
  setProjects((prev) =>
    prev.map((proj) =>
      proj.id === projectId ? { ...proj, views: (proj.views || 0) + 1 } : proj
    )
  );
}
