function OverviewTabDetails() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="p-4 border-2 border-solid border-green-600">
          <span>Permissions selected</span>
          <span>COUNT PERMISSIONS</span>
          <p>Number of actions selected in the saved permission setup.</p>
        </div>
        <div className="p-4 border-2 border-solid border-green-600">
          <span>Areas Covered</span>
          <span>COUNT MODULES</span>
          <p>
            Modules with at least one selected action. Open Permissions to see
            actions and record access.
          </p>
        </div>
      </div>
      <div>
        <div className="p-4 border-2 border-solid border-blue-600">
          <span>How multiple roles combine</span>
          <p>
            Roles add access together. Removing permission from one role does
            not remove it if another assigned role still allows it. Review the
            person’s combined access before saving.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OverviewTabDetails;
