CREATE OR REPLACE FUNCTION hex2dec (varchar)
RETURNS varchar as
$$
DECLARE
	_x numeric;
	_count int;
	_digit int;
BEGIN
	_x := 0;
	for _count in 1..length($1) loop
		EXECUTE E'SELECT x\''||substring($1 from _count for 1)|| E'\'::integer' INTO _digit;
		_x := _x * 16 + _digit ;
	end loop;
	return _x::varchar;
end
;
$$ language plpgsql immutable
;
