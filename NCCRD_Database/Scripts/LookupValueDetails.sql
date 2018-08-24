SELECT * FROM tb_erm_picklist PL
INNER JOIN tb_erm_picklist_value PLV
ON PL.ListId = PLV.ListId
ORDER BY PL.ListId