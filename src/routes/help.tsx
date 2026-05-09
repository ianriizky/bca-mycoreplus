import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/help')({
  component: HelpComponent,
})

function HelpComponent() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Keyboard Shortcuts & Help
        </h1>

        <div className="space-y-8">
          {/* Keyboard Shortcuts Section */}
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Keyboard Shortcuts
            </h2>
            <p className="mb-4 text-gray-600">
              BCA MyCore+ supports the following keyboard shortcuts for
              efficient editing:
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                <h3 className="font-semibold text-gray-900">Editing</h3>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  <li>
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      Ctrl+Z
                    </kbd>
                    {' / '}
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      Cmd+Z
                    </kbd>
                    {' - Undo last action'}
                  </li>
                  <li>
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      Ctrl+Y
                    </kbd>
                    {' / '}
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      Cmd+Y
                    </kbd>
                    {' - Redo last action'}
                  </li>
                  <li>
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      Ctrl+Shift+Z
                    </kbd>
                    {' / '}
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      Cmd+Shift+Z
                    </kbd>
                    {' - Redo (alternative)'}
                  </li>
                  <li>
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      Delete
                    </kbd>
                    {' / '}
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      Backspace
                    </kbd>
                    {' - Delete selected object'}
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 bg-green-50 p-4">
                <h3 className="font-semibold text-gray-900">Canvas</h3>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  <li>
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      Ctrl+C
                    </kbd>
                    {' / '}
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      Cmd+C
                    </kbd>
                    {' - Copy canvas to clipboard'}
                  </li>
                  <li>
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      ↑ ↓ ← →
                    </kbd>
                    {' - Move selected object'}
                  </li>
                  <li>
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      Escape
                    </kbd>
                    {' - Deselect object'}
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                <h3 className="font-semibold text-gray-900">Navigation</h3>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  <li>
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      Tab
                    </kbd>
                    {' - Move focus to next element'}
                  </li>
                  <li>
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      Shift+Tab
                    </kbd>
                    {' - Move focus to previous element'}
                  </li>
                  <li>
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      Enter
                    </kbd>
                    {' / '}
                    <kbd className="rounded bg-gray-200 px-2 py-1 font-mono">
                      Space
                    </kbd>
                    {' - Activate button'}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Accessibility Features Section */}
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Accessibility Features
            </h2>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>Screen Reader Support:</strong> All interactive elements
                are labeled with descriptive ARIA labels. Screen readers will
                announce button purposes and form field requirements.
              </p>
              <p>
                <strong>Focus Indicators:</strong> When navigating with
                keyboard, focused elements show a clear blue outline. This helps
                you see which element is currently active.
              </p>
              <p>
                <strong>Color Contrast:</strong> All text meets WCAG AA
                standards (4.5:1 contrast ratio) for readability, even for users
                with low vision.
              </p>
              <p>
                <strong>Keyboard Navigation:</strong> Every feature can be
                accessed using only the keyboard. No mouse required.
              </p>
              <p>
                <strong>Live Announcements:</strong> Important messages like
                "Copied to clipboard" are announced to screen readers
                automatically.
              </p>
            </div>
          </section>

          {/* Tips Section */}
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Tips for Efficient Editing
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                ✓ Use <strong>Ctrl+Z</strong> frequently to undo mistakes
              </li>
              <li>
                ✓ Use <strong>arrow keys</strong> to fine-tune object positions
              </li>
              <li>
                ✓ Use <strong>Ctrl+C</strong> to quickly copy your work to
                clipboard
              </li>
              <li>
                ✓ Use <strong>Tab</strong> to navigate between tools without
                using mouse
              </li>
              <li>
                ✓ Use <strong>Delete</strong> to remove unwanted objects
              </li>
            </ul>
          </section>

          {/* WCAG Compliance Section */}
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              WCAG 2.1 Compliance
            </h2>
            <p className="mb-3 text-sm text-gray-700">
              BCA MyCore+ is designed to meet WCAG 2.1 Level A accessibility
              standards, ensuring the application is usable by everyone,
              including people with disabilities.
            </p>
            <div className="text-xs text-gray-600">
              <p>
                For more information about web accessibility, visit{' '}
                <a
                  href="https://www.w3.org/WAI/WCAG21/quickref/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  WCAG 2.1 Quick Reference
                </a>
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="rounded-lg bg-blue-50 p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Need Help?
            </h2>
            <p className="text-sm text-gray-700">
              If you encounter any accessibility issues or have suggestions for
              improvement, please contact the BCA MyCore+ team. Your feedback
              helps us make the application better for everyone.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
