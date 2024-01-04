'use client';

export default function ErrorWrapper({ error }: { error: Error }) {
  return <h2 className="error-message">Ooops! {error.message}</h2>;
}
