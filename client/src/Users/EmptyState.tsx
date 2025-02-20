export const EmptyState = () => {
  return (
    <div className="emptyState" role="alert" aria-live="assertive">
      <h2 className="text-2xl font-bold">No users found</h2>
      <p className="mt-4 text-gray-500">Try adjusting your search.</p>
    </div>
  );
};
