TallyPrime TDL Collection Type Test Pack
=========================================

Purpose
-------
One .http request per candidate collection TYPE. Each request uses:
- POST http://localhost:9000
- company mani9
- XML export
- one field only: <FETCH>Name</FETCH>

How to run
----------
1. Open this folder in VS Code (or copy the .http files into your existing HTTP test folder).
2. Run one request at a time with the REST Client "Send Request" action.
3. Record whether Tally returns records, an empty collection, or an error.
4. Save a small response sample and mark the type in your documentation.

Important status notes
----------------------
- StockItem is used successfully as the parent loop collection in the batch request.
- Batch is verified when scoped to a stock item. This test file uses:
  <CHILDOF>Viaadi Hooks</CHILDOF>
  because a Batch collection without parent context returned an empty collection in the observed environment.
- Bill returned records in the user's test. FETCH * created a large response, so this test uses only FETCH Name.
- Company, Group, Ledger, StockGroup, Voucher, VoucherType, CostCentre, Budget, and Unit are candidates to test; this pack does not claim they are all valid or that the exact spelling is accepted in this TallyPrime version.
- A successful HTTP response alone does not prove the object type is useful. Check the returned XML structure.
- FETCH Name limits fields, not necessarily the number of records. Some collections may still return a large response.
- These files are diagnostic probes, not production requests. Keep the working batch-balance request unchanged.

Included types
--------------
Company, Group, Ledger, StockGroup, StockItem, Voucher, VoucherType,
CostCentre, Budget, Unit, Batch (parent-scoped), Bill.

Suggested recording columns
---------------------------
TYPE spelling | response/error | records returned? | example fields | response size | status
