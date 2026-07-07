import type { Project } from '../config/project'
import type { Template } from '../config/templates'
import { importProject } from './importProject'

/**
 * Loading a template always produces a normal, independent Project — never
 * a reference back to the Template it came from. Running the template's
 * project through the same importProject/normalizeProject pipeline already
 * used for pasted JSON keeps the load path safe against manifest drift: if
 * a template was authored against an older prop/variant shape, unknown
 * values are repaired using current manifest defaults instead of crashing
 * the Builder, exactly as already happens for external imports.
 */
export function loadTemplate(template: Template): Project {
  return importProject(template.project).project
}
