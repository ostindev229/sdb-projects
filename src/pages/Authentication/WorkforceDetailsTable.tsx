// WorkforceDetailsTable.tsx
import React from 'react';
import { WorkForceDetailsDataProps } from './type';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

interface WorkforceDetailsTableProps {
  workForceDetails: WorkForceDetailsDataProps[];
  onDelete: (id: number) => void;
  onEdit: (detail: WorkForceDetailsDataProps) => void; // Nouvelle fonction de rappel pour l'édition
}

const WorkforceDetailsTable: React.FC<WorkforceDetailsTableProps> = ({ workForceDetails, onDelete, onEdit }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#1F1F1F] text-left">
              <th className="min-w-[220px] py-4 px-4 font-medium text-white dark:text-white xl:pl-11">
                Prix par tête
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-white dark:text-white">
                Nombre d'ouvriers
              </th>
              <th className="py-4 px-4 font-medium text-white dark:text-white">
                Montant total
              </th>
              <th className="py-4 px-4 font-medium text-white dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {workForceDetails.map((detail) => (
              <tr key={detail.id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {detail.pricePerP}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-15 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {detail.number}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-15 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {detail.pricePerP * detail.number}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      onClick={() => onEdit(detail)} // Ajouter la fonction de rappel pour l'édition
                      className="hover:text-primary text-primary edit"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => onDelete(detail.id)}
                      className=" text-red-900 delete"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkforceDetailsTable;
