import { useState } from "react";
import { Input } from "../ui/Input/Input";
import css from "./PasswordRecovery.module.scss";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebase";

export const PasswordRecovery = ({ onBack }: { onBack: () => void }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Recovery email sent. Check your inbox");
    } catch (e) {
      setError("Failed to send recovery email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.passwordRecovery__block}>
      <h1 className={css.passwordRecovery__title}>Reset password</h1>

      <p className={css.passwordRecovery__description}>
        We’ll send you a reset link
      </p>

      <div className={css.passwordRecovery__field}>
        <Input
          label="Email address"
          id="email"
          type="email"
          placeholder="name@domain.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {error && <p className={css.passwordRecovery__error}>{error}</p>}
      {message && <p className={css.passwordRecovery__success}>{message}</p>}

      <div className={css.passwordRecovery__actions}>
        <button
          type="button"
          className={css.passwordRecovery__btn}
          onClick={handleSubmit}
          disabled={loading || !email}
        >
          {loading ? "Sending..." : "Send link"}
        </button>

        <button
          type="button"
          className={css.passwordRecovery__btnSecondary}
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};