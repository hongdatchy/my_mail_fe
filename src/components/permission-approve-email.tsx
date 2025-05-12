'use client';

import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MultiSelect } from './multi-select';
import { postData } from '@/service/api';
import { SaveUserApproveEmailDto } from '@/dto/SaveUserDto';

interface Props {
  onChange: (updated: string[]) => void;
  saveUserApproveEmailDtoList: SaveUserApproveEmailDto[];
  disabled?: boolean;
}

export default function PermissionApproveEmail({ disabled, onChange, saveUserApproveEmailDtoList }: Props) {
  const [permission, setPermission] = useState<'yes' | 'no'>('yes');

  useEffect(() => {
    if (permission === 'no') {
      onChange([]);
    }
  }, [permission]);

  const fetchListUser = async (keyword: string): Promise<{
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[]> => {
    const response = await postData('api/user/search',
      {
        "keyword": keyword,
        "page": "0",
        "size": "50",
      }
    );
    return response.content.map((item: any) => {
      return {
        value: item.id.toString(),
        label: item.mail + (item.orgName ?  ' < ' + item.orgName + ' >' : '')    
      }
    });

  };

  return (
    <div className="border rounded-xl p-4 space-y-4">
      <Label className="text-base font-medium">Quyền duyệt email</Label>
      <RadioGroup
        disabled={disabled}
        value={permission}
        onValueChange={(val) => setPermission(val as 'yes' | 'no')}
        className="flex flex-wrap w-full justify-between gap-4"
      >
        <div className="flex items-center space-x-2 w-1/2 sm:w-1/4">
          <RadioGroupItem value="yes" id="yes" />
          <Label htmlFor="yes">Có quyền</Label>
        </div>
        <div className="flex items-center space-x-2 w-1/2 sm:w-1/4">
          <RadioGroupItem value="no" id="no" />
          <Label htmlFor="no">Không có quyền</Label>
        </div>
      </RadioGroup>

      {permission === 'yes' && (
        <div>
          <Label className="text-sm font-medium">
            Cấu hình tài khoản mà được quyền duyệt luồng email
          </Label>
          <div className="mt-2">
            <MultiSelect
              onSearch={fetchListUser}
              disabled={disabled}
              placeholder="Chọn đối tượng gửi"
              variant="inverted"
              maxCount={3}
              options={saveUserApproveEmailDtoList.map((item) => {
                return {
                  label: item.userSendMail + (item.userSendOrgName ?  ' < ' + item.userSendOrgName + ' >' : ''),
                  value: item.userSendId.toString(),
                };
              })}
              defaultValue={saveUserApproveEmailDtoList.map((item) => item.userSendId.toString())}
              onValueChange={(value) => {
                onChange(value);
              }}
            />
          </div>
        </div>
      )}

    </div>

  );
}
