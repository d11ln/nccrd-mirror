/*
Update all existing projects to Verified = 1 (True)
*/

update
	P
set
	Verified = 1
from
	Project P
where
	Verified = 0