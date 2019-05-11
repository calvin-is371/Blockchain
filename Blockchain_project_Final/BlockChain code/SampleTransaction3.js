/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

/**
 * Sample transaction processor function.
 * @param {org.example.basic.SampleTransaction3} tx The sample transaction instance.
 * @transaction
 */
async function sampleTransaction3(tx) {  // eslint-disable-line no-unused-vars

    // Save the old value of the assets.
    const asset1Balance = tx.asset1.assetBalance;
    const asset2Balance = tx.asset2.assetBalance;
    const asset3Balance = tx.asset3.assetBalance;
    // Retrieve the type of the asset (Asset, Liability, Equity)
    const asset1Type = tx.asset1.assetType; 
    const asset2Type = tx.asset2.assetType;
    const asset3Type = tx.asset3.assetType;
  
    // Retrieve the amount debited or credited for each asset
    const asset1Debit = tx.debit1;
    const asset1Credit = tx.credit1;
    const asset2Debit = tx.debit2;
    const asset2Credit = tx.credit2;
  const asset3Debit = tx.debit3;
    const asset3Credit = tx.credit3;
    const totalDebit = asset1Debit + asset2Debit + asset3Debit;
    const totalCredit = asset1Credit + asset2Credit + asset3Credit
  
    // Check to see if the debits and credits of the entry balance 
    if (totalDebit != totalCredit) {
      throw new Error ('Debit and Credit do not balance');
    }
  
    // Update the asset with the new value.
    if (asset1Type == "Asset") {
        tx.asset1.assetBalance = asset1Balance + asset1Debit - asset1Credit;
    } else {
          tx.asset1.assetBalance = asset1Balance - asset1Debit + asset1Credit;
      }  
    
    if (asset2Type == "Asset") {
        tx.asset2.assetBalance = asset2Balance + asset2Debit - asset2Credit;
    } else {
          tx.asset2.assetBalance = asset2Balance - asset2Debit + asset2Credit;
      }   
  
    if (asset3Type == "Asset") {
        tx.asset3.assetBalance = asset3Balance + asset3Debit - asset3Credit;
    } else {
          tx.asset3.assetBalance = asset3Balance - asset3Debit + asset3Credit;
      }   
  
  
    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.example.basic.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset1);
    await assetRegistry.update(tx.asset2);
    await assetRegistry.update(tx.asset3);
}