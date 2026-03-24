import { FileX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <FileX className="mx-auto h-16 w-16 text-gray-300" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">404</h1>
        <p className="mt-2 text-gray-500">
          ページが見つかりませんでした。
        </p>
        <a
          href="/"
          className="mt-4 inline-block text-sm text-primary-600 hover:text-primary-700"
        >
          ホームに戻る
        </a>
      </div>
    </div>
  );
}
