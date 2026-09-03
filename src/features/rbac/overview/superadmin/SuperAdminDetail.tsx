function SuperAdminDetail() {
  return (
    <div>
      <div>
        <div>
          <span>Capabilities</span>
          <span>All platform capabilities</span>
          <p>
            Permissions describe actions such as view, create, correct, assign,
            configure, or export.
          </p>
        </div>
        <div>
          <span>Data scope</span>
          <span>All employees and departments</span>
          <p>
            Scope is evaluated separately so the same action can apply to the
            organization, a team, or self.
          </p>
        </div>
      </div>
      <div>
        <div>
          <span>Role membership rule</span>
          <p>
            Only a Super Admin may add or remove this role. Every membership
            change requires a reason and creates an audit event.
          </p>
        </div>
        <div>
          <span>How multiple roles combine</span>
          <p>
            Grants are additive. For each permission, the user receives the
            union of the data populations granted by their roles. The MVP has no
            explicit deny rule; Super Admin should normally stand alone. Always
            preview effective access before saving.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDetail;
