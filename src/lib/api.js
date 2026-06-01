const API_URL = import.meta.env.VITE_API_URL || 'https://cms-backend-satr.onrender.com'

export async function fetchProjects() {
  const res = await fetch(`${API_URL}/api/projects`)
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}))
    throw new Error(errData.error || 'Failed to fetch projects')
  }
  return res.json()
}

export async function fetchProjectBySlug(slug) {
  const res = await fetch(`${API_URL}/api/projects/${slug}`)
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}))
    throw new Error(errData.error || 'Project not found')
  }
  return res.json()
}

export async function createProject(projectData) {
  const res = await fetch(`${API_URL}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData)
  })
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}))
    throw new Error(errData.error || 'Failed to create project')
  }
  return res.json()
}

export async function updateProject(id, projectData) {
  const res = await fetch(`${API_URL}/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData)
  })
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}))
    throw new Error(errData.error || 'Failed to update project')
  }
  return res.json()
}

export async function deleteProject(id) {
  const res = await fetch(`${API_URL}/api/projects/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}))
    throw new Error(errData.error || 'Failed to delete project')
  }
  return res.json()
}

export async function fetchInquiries() {
  const res = await fetch(`${API_URL}/api/inquiries`)
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}))
    throw new Error(errData.error || 'Failed to fetch inquiries')
  }
  return res.json()
}

export async function createInquiry(inquiryData) {
  const res = await fetch(`${API_URL}/api/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiryData)
  })
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}))
    throw new Error(errData.error || 'Failed to submit inquiry')
  }
  return res.json()
}

export async function updateInquiry(id, inquiryData) {
  const res = await fetch(`${API_URL}/api/inquiries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiryData)
  })
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}))
    throw new Error(errData.error || 'Failed to update inquiry')
  }
  return res.json()
}

export async function deleteInquiry(id) {
  const res = await fetch(`${API_URL}/api/inquiries/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}))
    throw new Error(errData.error || 'Failed to delete inquiry')
  }
  return res.json()
}

export async function uploadImages(files) {
  const formData = new FormData()
  for (const file of files) {
    formData.append('files', file)
  }

  const res = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    body: formData
  })
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}))
    throw new Error(errData.error || 'Failed to upload images')
  }
  return res.json() // returns { urls: [...] }
}
