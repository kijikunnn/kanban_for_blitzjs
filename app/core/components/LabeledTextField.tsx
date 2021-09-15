import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string

  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "number"
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    console.log(props)

    return (
      <div>
        <div>
          <input
            className="pl-3 text-textMain border-b border-borderMain text-2xl  font-bold focus:outline-none"
            autoFocus={true}
            {...input}
            disabled={submitting}
            {...props}
            ref={ref}
          />
        </div>

        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}
      </div>
    )
  }
)

export default LabeledTextField
