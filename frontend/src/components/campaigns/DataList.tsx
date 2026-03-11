import { ReactNode } from "react";

interface DataListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyState?: ReactNode;
  loading?: boolean;
  loadingMessage?: string;
  error?: Error | null;
}

export function DataList<T>({
  items,
  renderItem,
  keyExtractor,
  emptyState,
  loading,
  loadingMessage,
  error,
}: DataListProps<T>) {
  if (loading) {
    return (
      <div className="text-gray-500 py-8 text-center">
        {loadingMessage || "Loading..."}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
        {error.message}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <>{emptyState || <div className="text-gray-500 py-8 text-center">No items found</div>}</>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={keyExtractor(item)}>{renderItem(item, index)}</div>
      ))}
    </div>
  );
}
